import React, { useState } from 'react';
import { Campaign } from '../types/Campaign';
import { CreditCard, MessageSquare, Check, AlertCircle } from 'lucide-react';

interface DonationFormProps {
  campaign: Campaign;
  onDonate: (amount: number, message: string, isAnonymous: boolean) => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ campaign, onDonate }) => {
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  
  const predefinedAmounts = [10, 25, 50, 100];
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };
  
  const handlePredefinedAmount = (value: number) => {
    setAmount(value.toString());
  };
  
  const handleNextStep = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Por favor ingresa un monto válido para donar');
      return;
    }
    setError('');
    setStep(2);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      setError('Por favor ingresa un monto válido para donar');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // Simulate donation processing
    setTimeout(() => {
      try {
        onDonate(parseFloat(amount), message, isAnonymous);
        setSuccess(true);
        setIsSubmitting(false);
        // Reset form after successful donation
        setTimeout(() => {
          setAmount('');
          setMessage('');
          setIsAnonymous(false);
          setStep(1);
          setSuccess(false);
        }, 3000);
      } catch (err) {
        setError('Hubo un error al procesar tu donación. Por favor intenta nuevamente.');
        setIsSubmitting(false);
      }
    }, 1500);
  };
  
  if (success) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">¡Donación exitosa!</h3>
          <p className="text-gray-600 mb-4">
            Tu donación de ${parseFloat(amount).toLocaleString()} ha sido procesada correctamente. 
            Gracias por tu apoyo a esta campaña.
          </p>
          <p className="text-sm text-gray-500">
            Puedes ver la transacción en la blockchain en unos minutos.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Apoya esta campaña</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          <>
            <div className="mb-6">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Monto a donar ($)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mb-6">
              {predefinedAmounts.map((preAmount) => (
                <button
                  key={preAmount}
                  type="button"
                  onClick={() => handlePredefinedAmount(preAmount)}
                  className={`py-2 px-4 border ${
                    amount === preAmount.toString() 
                      ? 'border-teal-500 bg-teal-50 text-teal-700' 
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  } rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                >
                  ${preAmount}
                </button>
              ))}
            </div>
            
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Continuar
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <div className="bg-gray-50 rounded-md p-3 flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Monto a donar</span>
                <span className="font-medium">${parseFloat(amount).toLocaleString()}</span>
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje (opcional)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Deja un mensaje de apoyo..."
                  />
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  id="anonymous"
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                  Realizar donación anónima
                </label>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Información de pago
                  </label>
                  <span className="text-xs text-gray-500">Conexión segura</span>
                </div>
                <div className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-50">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      Los datos de pago se ingresarán en la siguiente pantalla
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando
                    </>
                  ) : (
                    'Donar ahora'
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default DonationForm;