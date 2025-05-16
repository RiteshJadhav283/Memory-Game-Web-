document.addEventListener('DOMContentLoaded', function() 
{
    const levelBoxes = document.querySelectorAll('.level-box');
    
    levelBoxes.forEach(box => 
        {
        const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        corners.forEach(pos => 
            {
            const corner = document.createElement('div');
            corner.className = `pixel-corner ${pos}`;
            box.appendChild(corner);
        });

        box.addEventListener('click', function()
        {
            levelBoxes.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    document.querySelector('.start-btn').addEventListener('click', function() 
    {
        const selectedLevel = document.querySelector('.level-box.active').getAttribute('data-level');
        alert(`Starting Level ${selectedLevel}!`);
    });
});