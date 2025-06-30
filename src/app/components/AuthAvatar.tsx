import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useWeb3AuthDisconnect, useWeb3AuthUser } from "@web3auth/modal/react";

export default function AuthAvatar() {
    const { disconnect } = useWeb3AuthDisconnect();
    const { userInfo, loading } = useWeb3AuthUser();
    return (
        // TO DO: REALIZAR UN COMPONENTE DE AVATAR MOBILE
        <div>
            <Dropdown>
                <DropdownTrigger>
                    <div className="flex flex-row items-center cursor-pointer">
                        <Avatar
                            name={!loading ? userInfo?.name : "User"}
                            src={!loading ? userInfo?.profileImage : ""}
                            size="md"
                            className="cursor-pointer"
                        />
                        {!loading && userInfo?.name ? (
                            <span className="ml-2 font-medium text-gray-800">{userInfo.name}</span>
                        ) : (
                            <span className="ml-2 font-medium text-gray-800">Cargando...</span>
                        )}
                    </div>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem key="profile">Perfil</DropdownItem>
                    <DropdownItem key="settings">Configuración</DropdownItem>
                    <DropdownItem key="logout" onClick={() => disconnect()}>Cerrar sesión</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}