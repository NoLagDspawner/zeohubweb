// User data for fake executions
const users = [
    "ShadowNinja", "EpicGamer", "ScriptMaster", "CodeWizard", "PixelKing", 
    "ByteLord", "RobloxPro", "LuaExpert", "GameHacker", "VirtualHero",
    "DarkKnight", "TechSavvy", "ScriptSlinger", "DigitalDragon", "CyberSamurai",
    "VoidWalker", "NightStalker", "CodeBreaker", "GameChanger", "ScriptKing"
];

const games = [
    { id: "gag", name: "Grow A Garden", icon: "fa-seedling", color: "success" },
    { id: "pet", name: "Pet Simulator", icon: "fa-gem", color: "warning" },
    { id: "adopt", name: "Adopt Me", icon: "fa-dog", color: "info" },
    { id: "mm2", name: "Murder Mystery 2", icon: "fa-skull", color: "danger" }
];

// Execution counter
let executionCount = 0;
const executionList = document.getElementById('executions-list');
const executionCounter = document.getElementById('execution-count');

// Online counter
let onlineCount = 1238;
let onlineCountElement = document.getElementById('online-count');

// Function to update online count
function updateOnlineUsers() {
    // Randomly decide if users are joining or leaving (70% chance to add)
    const isAdding = Math.random() > 0.3;
    const changeAmount = Math.floor(Math.random() * 8) + 1; // 1-8 users
    
    // Calculate new count (don't go below 1200)
    let newCount = onlineCount + (isAdding ? changeAmount : -changeAmount);
    if (newCount < 1200) newCount = 1200 + Math.floor(Math.random() * 50);
    
    // Update online count
    onlineCount = newCount;
    onlineCountElement.textContent = onlineCount.toLocaleString();
    
    // Add animation class
    onlineCountElement.classList.add('fade-in');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        onlineCountElement.classList.remove('fade-in');
    }, 400);
}

// Function to create a fake execution with real time
function createFakeExecution() {
    // Select random user and game
    const user = users[Math.floor(Math.random() * users.length)];
    const game = games[Math.floor(Math.random() * games.length)];
    
    // Create a timestamp from 1 to 10 minutes ago
    const minutesAgo = Math.floor(Math.random() * 10) + 1;
    const timestamp = new Date(Date.now() - minutesAgo * 60000);
    
    // Format time
    const timeStr = formatTimeAgo(minutesAgo);
    
    // Create execution item
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item fade-in';
    
    // Create user avatar
    const activityAvatar = document.createElement('div');
    activityAvatar.className = 'activity-avatar';
    activityAvatar.textContent = user.charAt(0);
    
    // Create activity details
    const activityDetails = document.createElement('div');
    activityDetails.className = 'activity-details';
    
    const activityUser = document.createElement('div');
    activityUser.className = 'activity-user';
    activityUser.textContent = user;
    
    const activityAction = document.createElement('div');
    activityAction.className = 'activity-action';
    
    const activityText = document.createElement('span');
    activityText.textContent = 'executed script in';
    
    const activityGame = document.createElement('span');
    activityGame.className = 'activity-game';
    activityGame.innerHTML = `<i class="fas ${game.icon}"></i> ${game.name}`;
    
    const activityTime = document.createElement('span');
    activityTime.className = 'activity-time';
    activityTime.textContent = timeStr;
    
    // Build the structure
    activityAction.appendChild(activityText);
    activityAction.appendChild(activityGame);
    activityAction.appendChild(activityTime);
    
    activityDetails.appendChild(activityUser);
    activityDetails.appendChild(activityAction);
    
    activityItem.appendChild(activityAvatar);
    activityItem.appendChild(activityDetails);
    
    // Add to the top of the list
    if (executionList.firstChild) {
        executionList.insertBefore(activityItem, executionList.firstChild);
    } else {
        executionList.appendChild(activityItem);
    }
    
    // Update counter
    executionCount++;
    executionCounter.textContent = `${executionCount.toLocaleString()} Today`;
    
    // Limit to 8 items
    if (executionList.children.length > 8) {
        executionList.removeChild(executionList.lastChild);
    }
    
    // Remove fade-in class after animation completes
    setTimeout(() => {
        activityItem.classList.remove('fade-in');
    }, 400);
}

// Format time ago
function formatTimeAgo(minutes) {
    if (minutes === 1) return '1 min ago';
    return `${minutes} mins ago`;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Create initial executions
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFakeExecution();
        }, i * 300);
    }
    
    // Add new executions every 8 seconds
    setInterval(createFakeExecution, 8000);
    
    // Update online users every 5 seconds
    setInterval(updateOnlineUsers, 5000);
    
    // Copy button functionality
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.closest('.code-block');
            const code = codeBlock.querySelector('pre').textContent;
            
            navigator.clipboard.writeText(code).then(() => {
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                }, 2000);
            });
        });
    });
    
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const gameCards = document.querySelectorAll('.game-card');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Get the game id
            const gameId = tab.getAttribute('data-game');
            
            // Show/hide game cards
            gameCards.forEach(card => {
                if (card.getAttribute('data-game') === gameId) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                    setTimeout(() => card.classList.remove('fade-in'), 400);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Make first tab active by default
    tabs[0].click();
});
