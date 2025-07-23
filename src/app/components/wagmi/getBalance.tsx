import { useWalletClient } from "wagmi";
import { useEffect, useState } from "react";
import { BrowserProvider, ethers } from "ethers";
import { USDTIcon } from "@public/icons/USDTIcon";
import { ABI_ERC20_TOKEN } from "@/lib/ABIContracts";

const USDT = process.env.NEXT_PUBLIC_USDT_ADDRESS!;

export function Balance() {
  const { data: walletClient, isLoading, error } = useWalletClient();
  const [balanceData, setBalanceData] = useState<{
    value?: bigint,
    decimals: number,
    symbol: string,
  }>({
    value: undefined,
    decimals: 18,
    symbol: "USDT",
  });

  useEffect(() => {
    const getBalancePerUser = async () => {
      if (!walletClient) return;

      console.log("Fetching balance for user:", walletClient.account.address);

      const provider = new BrowserProvider(walletClient.transport);
      const signer = await provider.getSigner(walletClient.account.address);
      const contract = new ethers.Contract(USDT, ABI_ERC20_TOKEN, signer);

      const [balance, decimalsRaw, symbol] = await Promise.all([
        contract.balanceOf(walletClient.account.address),
        contract.decimals(),
        contract.symbol(),
      ]);

      setBalanceData({
        value: balance,
        decimals: Number(decimalsRaw),
        symbol,
      });
    };

    getBalancePerUser();
  }, [walletClient]);

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border">
      <USDTIcon size={20} color="#26A17B" />
      <span className="text-sm font-medium text-gray-700">
        {isLoading && 'Loading...'}
        {error && 'Error'}
        {balanceData.value !== undefined && !isLoading && !error &&
          `${ethers.formatUnits(balanceData.value, balanceData.decimals)}`
        }
      </span>
    </div>
  );
}