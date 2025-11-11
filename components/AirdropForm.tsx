"use client";

import {calculateTotal} from "@/utils";
import { InputForm } from "./ui/InputField";
import { useMemo, useState,useEffect } from "react";
import { chainsToTSender,tsenderAbi,erc20Abi} from "@/constants";
import { useAccount, useChainId,useConfig,useWriteContract} from "wagmi";
import {readContract,waitForTransactionReceipt} from "@wagmi/core";
import {Loader2} from "lucide-react";

export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState<string>("");
    const [recipients, setRecipients] = useState<string>("");
    const [amounts, setAmounts] = useState<string>("");
    const chainId = useChainId();
    const config = useConfig();
    const account = useAccount();
    const total:number = useMemo(() =>{
        const ans:number=calculateTotal(amounts);
        console.log(ans);return ans;} ,[amounts]);
    const {data:hash, isPending,writeContractAsync} = useWriteContract();
    const [isLoading,setIsLoading]=useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState(""); // 🔹 dynamic status message
     const [tokenName, setTokenName] = useState<string>("-");
  const [decimals, setDecimals] = useState<number>(18);
  const [tokenAmountWei, setTokenAmountWei] = useState<string>("0");

    // 🔹 Load saved form data on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("airdrop_tokenAddress");
    const savedRecipients = localStorage.getItem("airdrop_recipients");
    const savedAmounts = localStorage.getItem("airdrop_amounts");

    if (savedToken) setTokenAddress(savedToken);
    if (savedRecipients) setRecipients(savedRecipients);
    if (savedAmounts) setAmounts(savedAmounts);
  }, []);

  // 🔹 Save inputs to localStorage on change
  useEffect(() => {
    localStorage.setItem("airdrop_tokenAddress", tokenAddress);
  }, [tokenAddress]);

  useEffect(() => {
    localStorage.setItem("airdrop_recipients", recipients);
  }, [recipients]);

  useEffect(() => {
    localStorage.setItem("airdrop_amounts", amounts);
  }, [amounts]);

    // --- Fetch token name & decimals when address changes ---
  useEffect(() => {
    async function fetchTokenDetails() {
      if (!tokenAddress || tokenAddress.length < 10) {
        setTokenName("-");
        setDecimals(18);
        return;
      }
      try {
        const [name, tokenDecimals] = await Promise.all([
          readContract(config, {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "name",
          }),
          readContract(config, {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "decimals",
          }),
        ]);
        setTokenName(String(name));
        setDecimals(Number(tokenDecimals));
      } catch (err) {
        console.warn("Unable to fetch token details:", err);
        setTokenName("Unknown");
        setDecimals(18);
      }
    }

    fetchTokenDetails();
  }, [tokenAddress, config]);

  // --- Update token amount in wei ---
  useEffect(() => {
    try {
      const bigWei = BigInt(Math.floor(total)).toString();
      setTokenAmountWei(bigWei);
    } catch {
      setTokenAmountWei("0");
    }
  }, [total, decimals]);


    async function getApprovedAmount(tsenderAddress: string | null): Promise<number> {
        if (!tsenderAddress) {
            alert("TSender address not found!");
            return 0;
        }
        //Read from chain to see if enough tokens were approved
        const response = await readContract(config,{
    abi:erc20Abi,
    address:tokenAddress as `0x{string}`,
    functionName:"allowance",
    args:[account.address,tsenderAddress as `0x{string}`],
    })
    return response as number;
}
    async function handleSubmit() {
        setIsLoading(true);
        setLoadingMessage("Checking approvals...");
        const tsenderAddress = chainsToTSender[chainId]["tsender"];
        const approvedAmount = await getApprovedAmount(tsenderAddress);
        if(approvedAmount<total){
            setLoadingMessage("Waiting for wallet signature (approval)...");
            const approvalHash = await writeContractAsync({
                abi:erc20Abi,
                address:tokenAddress as `0x{string}`,
                functionName:"approve",
                args:[tsenderAddress as `0x{string}`,BigInt(total)],
            });
            setLoadingMessage("Waiting for approval confirmation on-chain...");
            console.log("Approval TX sent:", approvalHash);
            const approvalReceipt = await waitForTransactionReceipt(config,{
        hash:approvalHash
    })
    console.log("Approval Confirmed! ", approvalReceipt);
    setLoadingMessage("Waiting for wallet signature (airdrop)...");
    const airdropHash = await writeContractAsync({
                abi: tsenderAbi,
                address: tsenderAddress as `0x${string}`,
                functionName: "airdropERC20",
                args: [
                    tokenAddress,
                    // Comma or new line separated
                    recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amounts.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(total),
                ],
            });
            setLoadingMessage("Waiting for transaction confirmation...");
            console.log("Airdrop TX sent:", airdropHash);
            await waitForTransactionReceipt(config, { hash: airdropHash });
                  setLoadingMessage("✅ Airdrop completed successfully!");

        }
        else {
            await writeContractAsync({
                abi:tsenderAbi,
                address:tsenderAddress as `0x${string}`,
                functionName:"airdropERC20",
                args:[
                    tokenAddress,
                    //Comma or newline separated
                    recipients.split(/[,\n]+/)
                    .map(addr => addr.trim())
                    .filter(addr => addr!==''),
                    amounts.split(/[,\n]+/)
                    .map(amt=>amt.trim())
                    .filter(amt => amt!==''),
                    BigInt(total),
                ]
            })
        }
       setTimeout(() => {
        setIsLoading(false);
        setLoadingMessage("");
      }, 1500);
    }

    return (
        <div className="space-y-4">
            <InputForm
                label="Token Address"
                placeholder="0x"
                value={tokenAddress}
                onChange={e=>setTokenAddress(e.target.value)}
            />
            <InputForm
                label="Recipients"
                placeholder="0x3hj9h89rx... , 0x4klj23j4k..."
                value={recipients}
                onChange={e=>setRecipients(e.target.value)}
                large={true}
            />
            <InputForm
                label="Amounts"
                placeholder="100, 200, 400..."
                value={amounts}
                onChange={e=>setAmounts(e.target.value)}
                large={true}
            />
            <button onClick={handleSubmit} 
            disabled={isLoading}
            className="px-6 py-3 bg-blue-800 hover:bg-blue-600 
            text-white font-semibold rounded-lg shadow-sm transition-colors duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            "
            >{isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {loadingMessage || "Processing..."}
          </>
        ) : (
          "Send Tokens"
        )}
        </button>
            
            {/* 🧾 Transaction Details Box */}
      <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-2">Transaction Details</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p>
            <span className="font-medium">Token Name:</span> {tokenName}
          </p>
          <p>
            <span className="font-medium">Decimals:</span> {decimals}
          </p>
          <p>
            <span className="font-medium">Amount (tokens):</span> {total/(10**decimals)}
          </p>
          <p className="break-all">
            <span className="font-medium">Amount (wei):</span> {tokenAmountWei}
          </p>
        </div>
      </div>
        </div>
    );
}