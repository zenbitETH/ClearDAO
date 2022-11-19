import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Header from '../components/Header';

const { chains, provider } = configureChains(
  [
    {
      id: 31415,
      name: "Filecoin — Wallaby testnet",
      network: "filecoin",
      testnet: true,
      rpcUrls: {
        default: "https://wallaby.node.glif.io/rpc/v0",
      },
    },
  ],
  [
    alchemyProvider({ apiKey: "UP7-vCgH4OfFwUygRDLg8dXpADY-zb3T" }),
    publicProvider(),
  ]
);


const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        
      <div className="relative flex items-top justify-center sm:items-center sm:pt-0 min-h-screen font-exo 
				bg-gradient-to-br from-solar-100  to-lunar-100
				dark:bg-gradient-to-br dark:from-lunar-900 dark:to-lunar-600  ">
					<Header/>
					{/*<Toolbar/>*/}
					<Component {...pageProps} />
				</div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
