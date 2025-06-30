import React from 'react';
import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import { Transaction } from '../types/Transaction';

interface TransactionListProps {
  transactions: Transaction[];
  showBlockchainLink?: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions,
  showBlockchainLink = true
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Transacciones</h3>
        <p className="mt-1 text-sm text-gray-500">
          Historial de transacciones verificadas por blockchain
        </p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div key={transaction.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'donation' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'donation' ? (
                      <ArrowUpRight className={`h-5 w-5 ${
                        transaction.type === 'donation' ? 'text-green-600' : 'text-blue-600'
                      }`} />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.type === 'donation' ? 'Donación recibida' : 'Fondos retirados'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {transaction.date.toLocaleDateString()} • {transaction.date.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    transaction.type === 'donation' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {transaction.type === 'donation' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </p>
                  {showBlockchainLink && (
                    <a 
                      href={`https://etherscan.io/tx/${transaction.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-teal-600 hover:text-teal-800 flex items-center justify-end mt-1"
                    >
                      Ver en blockchain <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {transaction.from.substring(0, 8)}...{transaction.from.substring(transaction.from.length - 8)} 
                  {transaction.type === 'donation' ? ' → ' : ' → '}
                  {transaction.to.substring(0, 8)}...{transaction.to.substring(transaction.to.length - 8)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-8 text-center">
            <p className="text-gray-500">No hay transacciones para mostrar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;