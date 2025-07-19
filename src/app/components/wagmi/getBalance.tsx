import { useAccount, useBalance } from "wagmi";
import { formatUnits, getAddress } from "viem";
import { USDTIcon } from "@public/icons/USDTIcon";
import { Chip } from "@heroui/react";

export function Balance() {
  const { address } = useAccount()
  const tokenChecksum = getAddress('0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9')

  const { data, isLoading, error } = useBalance({
    address,
    token: tokenChecksum,
  })

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border">
      <USDTIcon size={20} color="#26A17B" />
      <span className="text-sm font-medium text-gray-700">
        {isLoading && 'Loading...'}
        {error && 'Error'}
        {data?.value !== undefined && !isLoading && !error && 
          `${formatUnits(data.value, data.decimals)} ${data.symbol}`
        }
      </span>
    </div>
  )
}