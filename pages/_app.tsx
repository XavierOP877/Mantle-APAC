import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig, Chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const mantletestnet: Chain = {
  id: 5003,
  name: 'Mantle Testnet',
  network: 'Mantle Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MNT',
    symbol: 'MNT',
  },
  rpcUrls: {
    default: { http: ['https://rpc.sepolia.mantle.xyz/'] },
    public: { http: ['https://rpc.sepolia.mantle.xyz/'] },
  },
  blockExplorers: {
    default: { name: 'Mantle Testnet', url: 'https://sepolia.mantlescan.xyz' },
  },
  testnet: true,
};

const { chains, publicClient } = configureChains(
  [mantletestnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'SureBet',
  projectId: 'cfcfff3713397dd7fc0883ae81502256',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;