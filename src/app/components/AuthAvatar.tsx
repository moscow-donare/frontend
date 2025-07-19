import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useWeb3AuthDisconnect, useWeb3AuthUser } from "@web3auth/modal/react";
import { use, useEffect, useState } from "react";
import { useWalletClient } from "wagmi";

export default function AuthAvatar() {
    const { disconnect } = useWeb3AuthDisconnect();
    const { userInfo, loading } = useWeb3AuthUser();
    const {data: walletClient } = useWalletClient();
    const [userInfoData, setUserInfo] = useState(userInfo);

    useEffect(() => {
        console.log("User Info:", userInfo);
        console.log("Wallet Client:", walletClient);
        userInfoData && setUserInfo(userInfo);

    }, [userInfo, walletClient]);
    return (
        // TO DO: REALIZAR UN COMPONENTE DE AVATAR MOBILE
        <div>
            <Dropdown>
                <DropdownTrigger>
                    <div className="flex flex-row items-center cursor-pointer">
                        <Avatar
                            name={!loading ? userInfoData?.name : "User"}
                            src={!loading ? userInfoData?.profileImage : ""}
                            size="md"
                            className="cursor-pointer"
                        />
                        {!loading && userInfoData?.name ? (
                            <span className="ml-2 font-medium text-gray-800">{userInfoData.name}</span>
                        ) : (
                            <span className="ml-2 font-medium text-gray-800"></span>
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