import axios from 'axios';

const PINATA_API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY!;
const PINATA_API_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET!;
const PINATA_GATEWAY_URL = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL!;

export const useIPFS = () => {
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post(PINATA_API_URL, formData, {
      maxContentLength: Infinity,
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
    });

    const cid = res.data.IpfsHash;
    return `ipfs://${cid}`;
  };

  const resolveCid = (ipfsUrl: string): string => {
    if (!ipfsUrl.startsWith('ipfs://')) return ipfsUrl;
    const cid = ipfsUrl.replace('ipfs://', '');
    return `${PINATA_GATEWAY_URL}/ipfs/${cid}`;
  };

  return {
    uploadFile,
    resolveCid,
    uploading: false,
  };
};
