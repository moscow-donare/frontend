import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useWeb3AuthDisconnect } from "@web3auth/modal/react";

export default function AuthAvatar() {
    const { disconnect } = useWeb3AuthDisconnect();

    return (
        <div>
            <Dropdown>
                <DropdownTrigger>
                    <Avatar
                        name={"User"}
                        src={""}
                        size="md"
                        className="cursor-pointer"
                    />
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