document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.video-background');
    const dots = document.querySelectorAll('.video-dot');
    let currentVideoIndex = 0;
    const videoCount = videos.length;
    let intervalId;

    // Function to switch videos
    function switchVideo(index) {
        // Remove active class from all videos and dots
        videos.forEach(video => video.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current video and dot
        videos[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Ensure the current video is playing
        videos[index].play();
    }

    // Function to cycle to next video
    function nextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videoCount;
        switchVideo(currentVideoIndex);
    }

    // Set up click handlers for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentVideoIndex = index;
            switchVideo(currentVideoIndex);
            
            // Reset the interval
            clearInterval(intervalId);
            intervalId = setInterval(nextVideo, 8000);
        });
    });

    // Start the automatic cycling
    intervalId = setInterval(nextVideo, 8000);

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            console.log('Search query:', this.value);
        }
    });
});