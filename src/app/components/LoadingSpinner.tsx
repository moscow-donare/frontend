import { Spinner } from "@heroui/react";

export default function LoadingSpinner() {
    return (
        <div className="w-full h-screen flex flex-col gap-2 items-center justify-center">
            <Spinner color="primary" size="lg"/>
            <span className="text-gray-500">Cargando...</span>
        </div>
    );
}