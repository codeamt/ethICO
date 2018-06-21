<h1 align="center"> ethICO </h1>
<p>This is a simple decentralized app (dApp) to help launch/manage an Initial Coin Offering (ICO) backed by Ether and the Ethereum blockchain. The dApp utilizes Truffle, Metamask and Ganache to deploy and test contracts:</p> 
<p align="center">
<img src="https://ucarecdn.com/b787bba8-3f2d-47b3-8073-76c830fc023e/" width="40%" height="30%" />
</p>

## Demo on Ropsten Network 
This demo is hosted on Heroku and works if you have the Metamask extension for your browser installed. More details on installation below.

<p align="center">
<img src="https://ucarecdn.com/357cb6ae-a347-4f3a-bf7e-e584509b25bf/" width="70%" height="60%" />
</p>

- Live Demo: [https://ico-launcher.herokuapp.com/](https://ico-launcher.herokuapp.com/)

This dAPP implements three solidity contracts deployed to the Ropsten Testnet -- Fundraiser.sol, Fund.sol, and FundCoin.sol (the pretend asset of the fundraiser).

## Iterating on Repo Locally 

To run the app in your own development environment, you need Node.js / NPM, Webpack, Truffle, and Optionally Ganache. To get these build essentials, do the following...

<b>1. Install Homebrew: </b>

In the terminal:<br>
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew update
brew doctor
brew prune
brew -v
```
<br>

<b>2. Install Node, NPM, Weback and Truffle </b>

Now, install build essentials (if you don't have these already:<br>
```
brew install node               #installs both node and npm
npm install -g truffle
npm install -g webpack          #for the cli
node -v
npm -v
truffle -v 
webpack -v
```

<b>3. Clone this repo </b>

Then, clone a copy of this repo:<br>
```
git clone https://github.com/codeamt/ethICO.git
```
<br>


<b>4. Install/Setup Metamask </b>

Metamask has a few extensions available, depending upon your preferred browser (Chrome, Firefox, or Opera), but also
offers their own web3 browser [Brave](https://brave.com/).

To get the right extension, download [here](https://metamask.io/). 

Once you've completed the Metamask onboarding process, switch the network from the MainNet to Ropsten Testnet. 

<b>Steps:</b>

- Go back to the Metamask extension, click on the drop down menu where it says MainNet and select the "Ropsten Test Network" option: <br>
<p align="center">
<img src="https://ucarecdn.com/bee2e7f3-e7b7-4914-8138-dbe9b7e3b61b/" width="40%" height="50%" />
</p><br>

Metamask will automagically generate your first eth account on the Testnet for you.
<br>

<b>5. Run the Project and Launch an ICO Campaign! </b>

In the terminal:<br>
```
cd ethICO && npm run dev
```
<br>
Now go to http://localhost:7545 in the browser, and the dApp should be running out of the box! You can launch the ICO and purchase FundCoin (FDC) to contribute! Since this app is only for demonstrative purposes, the Withdrawal functionality is intentially left out.
<br>

To iterate on this project, delete index.html and app.js in the build directory, make changes, save and run:<br>

```
npm run build
```
<br> 
The build folder should be populated with browser-friendly versions of your updated index.html and app.js. 
<br><br>

<b>6. Download/Install Truffle's Ganache (Optional)</b>

Ganache sets up a local rpc server and blockchain for testing purposes. It also comes with 5 Ethereum test accounts, preloaded with ether. 

Download here: [Ganache Download for Mac OS](https://github.com/trufflesuite/ganache/releases/download/v1.1.0/Ganache-1.1.0.dmg) 


Once downloaded and launched, your dashboard should look like this: <br>
<p align="center">
<img src="https://ucarecdn.com/5344d135-e773-4733-a5bd-073d52fd2e93/" width="70%" height="60%" />
</p>
<br>

Localhost will use Ganache now. To import Ganache addresses into Metamask: 

<b>Steps:</b>
- In Ganache, copy the RPC server url up at the top (which should be http://127.0.0.1:7545)
- Go back to the Metamask extension, click on the drop down menu where it says MainNet and select the "Custom RPC" option: <br>
<p align="center">
<img src="https://ucarecdn.com/0cc9e6fe-e32d-45fd-bca4-6663dcb14561/" width="40%" height="50%" />
</p><br>
- Then paste the Ganache RPC url where it says "New RPC url" and save: <br>
<p align="center">
<img src="https://ucarecdn.com/e3ec46b7-62ab-4da9-9e8a-8b1b60e57be2/" width="40%" height="50%" />
</p><br>

Again, Metamask will automagically import your first eth address listed in Ganache. To import more than one Ganache account: 

- In Ganache, under accounts, click on the key icon by one of the other accounts you'd like to sync with Metamask and copy its private key. 
- Back in Metamask, click on the user profile icon and select "import address" 

<p align="center">
  <img src="https://ucarecdn.com/2d863f84-1def-43d3-a302-b3786f34525b/" width="40%" height="50%" />
</p><br>

- Paste the private key you copied into the input:
<p align="center">
  <img src="https://ucarecdn.com/00e387cd-20b0-4a9f-9aec-bd7c780e81d5/" width="40%" height="50%" />
</p><br>









