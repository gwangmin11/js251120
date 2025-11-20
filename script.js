document.addEventListener('DOMContentLoaded', () => {
    // Skill bars animation
    const skillLevels = document.querySelectorAll('.skill-level');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.level + '%';
            }
        });
    }, { threshold: 0.5 });

    skillLevels.forEach(skill => {
        observer.observe(skill);
    });

    // Fun fact generator
    const funFactButton = document.getElementById('fun-fact-button');
    const funFactText = document.getElementById('fun-fact-text');
    const funFacts = [
        "가장 좋아하는 음식은 떡볶이입니다.",
        "해군 복무 시절 가장 기억에 남는 곳은 진해입니다.",
        "가장 감명 깊게 본 영화는 '타짜'입니다.",
        "코딩할 때 즐겨 듣는 음악은 디즈니 음악입니다.",
        "가장 좋아하는 계절은 가을입니다."
    ];
    let lastFactIndex = -1;

    funFactButton.addEventListener('click', () => {
        let newFactIndex;
        do {
            newFactIndex = Math.floor(Math.random() * funFacts.length);
        } while (newFactIndex === lastFactIndex);
        lastFactIndex = newFactIndex;
        funFactText.textContent = funFacts[newFactIndex];
    });

    // Set initial fun fact
    funFactButton.click();
});
