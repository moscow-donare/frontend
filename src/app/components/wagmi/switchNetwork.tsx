import { useChainId, useSwitchChain } from "wagmi";

export function SwitchChain() {
  const chainId = useChainId();
  const { chains, switchChain, error, isPending } = useSwitchChain();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChainId = parseInt(e.target.value);
    if (selectedChainId !== chainId) {
      console.log(`Cambiando de red a: ${selectedChainId}`);
      switchChain({ chainId: selectedChainId });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <select
        id="chain"
        onChange={handleChange}
        value={chainId}
        className="p-2 border border-gray-300 rounded"
      >
        {chains.map((chain) => (
          <option key={chain.id} value={chain.id}>
            {chain.name}
          </option>
        ))}
      </select>

      {isPending && <p className="text-blue-500">Cambiando de red...</p>}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
