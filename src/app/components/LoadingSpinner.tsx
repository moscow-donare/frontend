import { Spinner } from "@heroui/react";

export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <Spinner color="primary" size="lg"/>
            <span className="">Cargando...</span>
        </div>
    );
}