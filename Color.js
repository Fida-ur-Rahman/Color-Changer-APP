 // DOM Elements
        const body = document.body;
        const colorDisplay = document.querySelector('.color-display');
        const colorCode = document.querySelector('.color-code');
        const colorButtons = document.querySelector('.color-buttons');
        const randomBtn = document.getElementById('randomBtn');
        const resetBtn = document.getElementById('resetBtn');
        const customColor = document.getElementById('customColor');
        const historyColors = document.getElementById('historyColors');
        
        // Initial color
        let currentColor = '#f0f0f0';
        
        // Preset colors
        const presetColors = [
            '#3498db', // Blue
            '#e74c3c', // Red
            '#2ecc71', // Green
            '#f1c40f', // Yellow
            '#9b59b6', // Purple
            '#1abc9c', // Teal
            '#e67e22', // Orange
            '#34495e', // Dark Blue
            '#ecf0f1', // Light Gray
            '#2c3e50'  // Dark Gray
        ];
        
        // Initialize color history from localStorage or empty array
        let colorHistory = JSON.parse(localStorage.getItem('colorHistory')) || [];
        
        // Function to change background color
        function changeBackgroundColor(color) {
            body.style.backgroundColor = color;
            colorDisplay.style.backgroundColor = color;
            colorCode.textContent = color.toUpperCase();
            currentColor = color;
            
            // Update history
            updateHistory(color);
            
            // Update custom color picker value
            customColor.value = color;
        }
        
        // Function to generate preset color buttons
        function generateColorButtons() {
            presetColors.forEach(color => {
                const button = document.createElement('button');
                button.className = 'color-btn';
                button.style.backgroundColor = color;
                button.innerHTML = '<i class="fas fa-fill-drip"></i>';
                button.setAttribute('title', color.toUpperCase());
                button.setAttribute('aria-label', `Change color to ${color}`);
                
                button.addEventListener('click', () => {
                    changeBackgroundColor(color);
                });
                
                colorButtons.appendChild(button);
            });
        }
        
        // Function to generate random color
        function generateRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        
        // Function to update color history
        function updateHistory(color) {
            // Remove color if it already exists in history
            colorHistory = colorHistory.filter(c => c !== color);
            
            // Add color to beginning of history
            colorHistory.unshift(color);
            
            // Keep only last 8 colors
            if (colorHistory.length > 8) {
                colorHistory = colorHistory.slice(0, 8);
            }
            
            // Save to localStorage
            localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
            
            // Update history display
            renderHistory();
        }
        
        // Function to render history colors
        function renderHistory() {
            historyColors.innerHTML = '';
            
            colorHistory.forEach(color => {
                const historyColor = document.createElement('div');
                historyColor.className = 'history-color';
                historyColor.style.backgroundColor = color;
                historyColor.setAttribute('title', color.toUpperCase());
                historyColor.setAttribute('aria-label', `Apply ${color}`);
                
                historyColor.addEventListener('click', () => {
                    changeBackgroundColor(color);
                });
                
                historyColors.appendChild(historyColor);
            });
        }
        
        // Function to reset to default color
        function resetToDefault() {
            changeBackgroundColor('#f0f0f0');
        }
        
        // Event Listeners
        randomBtn.addEventListener('click', () => {
            const randomColor = generateRandomColor();
            changeBackgroundColor(randomColor);
        });
        
        resetBtn.addEventListener('click', resetToDefault);
        
        customColor.addEventListener('input', () => {
            changeBackgroundColor(customColor.value);
        });
        
        // Initialize the app
        function init() {
            generateColorButtons();
            renderHistory();
            changeBackgroundColor(currentColor);
        }
        
        // Start the app
        init();