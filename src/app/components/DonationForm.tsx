import React, { useState } from 'react';
import { Campaign } from '../types/Campaign';
import { CreditCard, MessageSquare, Check, AlertCircle } from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Input, Textarea, Checkbox, Chip, CircularProgress } from '@heroui/react';

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
      } catch {
        setError('Hubo un error al procesar tu donación. Por favor intenta nuevamente.');
        setIsSubmitting(false);
      }
    }, 1500);
  };
  
  if (success) {
    return (
      <Card className="shadow-md">
        <CardBody className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success-100 mb-4">
            <Check className="h-6 w-6 text-success-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">¡Donación exitosa!</h3>
          <p className="text-gray-600 mb-4">
            Tu donación de ${parseFloat(amount).toLocaleString()} ha sido procesada correctamente. 
            Gracias por tu apoyo a esta campaña.
          </p>
          <Chip color="success" variant="flat" size="sm">
            Puedes ver la transacción en la blockchain en unos minutos.
          </Chip>
        </CardBody>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <h3 className="text-lg font-medium text-gray-900">Apoya esta campaña</h3>
      </CardHeader>
      <CardBody>
        {error && (
          <Chip
            color="danger"
            variant="flat"
            startContent={<AlertCircle className="h-4 w-4" />}
            className="mb-4 w-full justify-start"
          >
            {error}
          </Chip>
        )}
        
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <>
              <div className="mb-6">
                <Input
                  type="text"
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*\.?\d*$/.test(value)) {
                      setAmount(value);
                    }
                  }}
                  label="Monto a donar ($)"
                  placeholder="0.00"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  variant="bordered"
                  color="primary"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-6">
                {predefinedAmounts.map((preAmount) => (
                  <Button
                    key={preAmount}
                    type="button"
                    variant={amount === preAmount.toString() ? "solid" : "bordered"}
                    color={amount === preAmount.toString() ? "primary" : "default"}
                    size="sm"
                    onClick={() => setAmount(preAmount.toString())}
                  >
                    ${preAmount}
                  </Button>
                ))}
              </div>
              
              <Button
                type="button"
                onClick={handleNextStep}
                color="primary"
                className="w-full"
                size="lg"
              >
                Continuar
              </Button>
            </>
          ) : (
            <>
              <div className="mb-4">
                <Card className="bg-default-50">
                  <CardBody className="flex flex-row justify-between items-center">
                    <span className="text-sm text-default-500">Monto a donar</span>
                    <span className="font-medium">${parseFloat(amount).toLocaleString()}</span>
                  </CardBody>
                </Card>
              </div>
              
              <div className="mb-4">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  label="Mensaje (opcional)"
                  placeholder="Deja un mensaje de apoyo..."
                  variant="bordered"
                  color="secondary"
                  startContent={<MessageSquare className="h-4 w-4 text-default-400" />}
                  minRows={3}
                />
              </div>
              
              <div className="mb-6">
                <Checkbox
                  isSelected={isAnonymous}
                  onValueChange={setIsAnonymous}
                  color="primary"
                >
                  Realizar donación anónima
                </Checkbox>
              </div>
              
              <div className="mb-6">
                <Card className="bg-default-50">
                  <CardBody>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-default-700">Información de pago</span>
                      <Chip size="sm" color="success" variant="flat">Conexión segura</Chip>
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-default-400 mr-2" />
                      <span className="text-sm text-default-500">
                        Los datos de pago se ingresarán en la siguiente pantalla
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="bordered"
                  color="secondary"
                  className="flex-1"
                >
                  Atrás
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  color="primary"
                  className="flex-1"
                  startContent={isSubmitting && <CircularProgress size="sm" color="primary" />}
                >
                  {isSubmitting ? 'Procesando' : 'Donar ahora'}
                </Button>
              </div>
            </>
          )}
        </form>
      </CardBody>
    </Card>
  );
};

export default DonationForm;