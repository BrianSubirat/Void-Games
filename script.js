document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles for home page
    particlesJS('home-particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#00fffc", "#fc00ff"]
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00fffc",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                }
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                }
            }
        },
        retina_detect: true
    });
});

function openGame(url, event) {
    event = event || window.event;
    const target = event.currentTarget || event.target;
    const gameTitle = target.querySelector('h3') 
        ? target.querySelector('h3').textContent 
        : 'Unknown Game';
    
    document.getElementById('game-title').textContent = gameTitle;
    document.getElementById('game-frame').src = url;
    document.getElementById('game-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom.forEach(pJS => {
            pJS.pJS.fn.vendors.destroypJS();
        });
        window.pJSDom = [];
    }
    
    let particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.zIndex = '-1';
        document.querySelector('.modal-frame-container').appendChild(particlesContainer);
    }
    
    try {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#ff0000', '#00ff00', '#0000ff']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.3,
                    random: true
                },
                size: {
                    value: 4,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    } catch (error) {
        console.error('Error initializing particles:', error);
    }
    
    // Add loader
    const loaderHTML = `
        <div class="game-loader">
            <div class="a2d">
                <div class="dot" style="--i: 0"></div>
                <div class="dot" style="--i: 1"></div>
            </div>
            <h1>Loading game...</h1>
        </div>
    `;
    
    document.querySelector('.modal-frame-container').insertAdjacentHTML('beforeend', loaderHTML);
    
    // Hide loader when game loads
    const gameFrame = document.getElementById('game-frame');
    gameFrame.onload = function() {
        const loader = document.querySelector('.game-loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => {
                if (loader && loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }
    };

    // Add error handling for frame load
    gameFrame.onerror = function() {
        const loader = document.querySelector('.game-loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => {
                if (loader && loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }
    };

    // Set a timeout to remove loader if it stays too long
    setTimeout(() => {
        const loader = document.querySelector('.game-loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => {
                if (loader && loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }
    }, 10000); // 10 second timeout
}

function closeGame() {
    document.getElementById('game-modal').style.display = 'none';
    document.getElementById('game-frame').src = '';
    document.body.style.overflow = 'auto';
    
    // Remove loader if present
    const loader = document.querySelector('.game-loader');
    if (loader) {
        loader.remove();
    }
    
    // Clear particles
    if(window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom.forEach(pJS => {
            pJS.pJS.fn.vendors.destroypJS();
        });
        window.pJSDom = [];
    }
    
    // Remove particles container
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        particlesContainer.remove();
    }
}

function reloadGame() {
    const frame = document.getElementById('game-frame');
    frame.src = frame.src;
}

function toggleFullscreen() {
    const frame = document.getElementById('game-frame');
    if (!document.fullscreenElement) {
        if (frame.requestFullscreen) {
            frame.requestFullscreen();
        } else if (frame.mozRequestFullScreen) {
            frame.mozRequestFullScreen();
        } else if (frame.webkitRequestFullscreen) {
            frame.webkitRequestFullscreen();
        } else if (frame.msRequestFullscreen) {
            frame.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    let modal = document.getElementById('game-modal');
    if (event.target == modal) {
        closeGame();
    }
}

// Update initial game count
document.querySelector('.game-count').textContent = `${document.querySelectorAll('.game-card').length} games`;

// Search functionality
document.getElementById('search-input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const games = document.querySelectorAll('.game-card');
    let visibleGames = 0;
    
    games.forEach(game => {
        const title = game.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            game.style.display = 'block';
            visibleGames++;
        } else {
            game.style.display = 'none';
        }
    });
    
    document.querySelector('.game-count').textContent = `${visibleGames} games`;
});

// Modify onclick handlers in HTML to pass the event
document.querySelectorAll('.game-card').forEach(card => {
    card.onclick = function(event) {
        const url = card.getAttribute('data-url');
        openGame(url, event);
    };
});

function getSuggestedGames() { return []; }
function updateSuggestedGames() { }