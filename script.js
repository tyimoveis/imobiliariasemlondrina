// Hamburger Menu
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('active');
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    themeIcon.setAttribute('data-feather', isDark ? 'sun' : 'moon');
    feather.replace();
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load Theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeIcon.setAttribute('data-feather', 'sun');
    feather.replace();
}

// Search Form (index.html, imoveis.html)
const searchForm = document.getElementById('search-form');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        const precoMin = parseInt(document.getElementById('precoMin').value) || 0;
        const precoMax = parseInt(document.getElementById('precoMax').value) || Infinity;

        if (precoMin > precoMax) {
            alert('O valor mínimo não pode ser maior que o valor máximo.');
            valid = false;
        }

        if (valid) {
            const formData = new FormData(e.target);
            const query = new URLSearchParams();
            formData.forEach((value, key) => {
                if (value) query.set(key, value);
            });
            window.location.href = `imoveis.html?${query.toString()}`;
        }
    });

    searchForm.addEventListener('reset', () => {
        window.location.href = 'imoveis.html';
    });
}

// Contato Form (index.html, imovel.html)
const contatoForm = document.getElementById('contato-form');
if (contatoForm) {
    contatoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();

        if (!nome) {
            alert('Nome é obrigatório.');
            valid = false;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('E-mail inválido.');
            valid = false;
        }

        if (!telefone || !/^\d{10,11}$/.test(telefone.replace(/\D/g, ''))) {
            alert('Telefone inválido.');
            valid = false;
        }

        if (valid) {
            alert('Mensagem enviada com sucesso! (Simulação)');
            e.target.reset();
        }
    });
}

// Imóveis Data (imoveis.html)
const imoveisData = [
    {
        id: 'IMOB001',
        imagem: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=300&auto=format&fit=crop',
        titulo: 'Apartamento 3 quartos - Gleba Palhano',
        preco: 600000,
        detalhes: 'Gleba Palhano | 150m² | 3 quartos | 2 banheiros',
        bairro: 'gleba-palhano'
    },
    {
        id: 'IMOB002',
        imagem: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=300&auto=format&fit=crop',
        titulo: 'Apartamento 4 quartos - Gleba Palhano',
        preco: 800000,
        detalhes: 'Gleba Palhano | 180m² | 4 quartos | 3 banheiros',
        bairro: 'gleba-palhano'
    },
    {
        id: 'IMOB003',
        imagem: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=300&auto=format&fit=crop',
        titulo: 'Apartamento 2 quartos - Gleba Palhano',
        preco: 450000,
        detalhes: 'Gleba Palhano | 100m² | 2 quartos | 1 banheiro',
        bairro: 'gleba-palhano'
    },
    {
        id: 'IMOB004',
        imagem: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=300&auto=format&fit=crop',
        titulo: 'Apartamento 3 quartos - Gleba Palhano',
        preco: 700000,
        detalhes: 'Gleba Palhano | 160m² | 3 quartos | 2 banheiros',
        bairro: 'gleba-palhano'
    },
    {
        id: 'IMOB005',
        imagem: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=300&auto=format&fit=crop',
        titulo: 'Apartamento 2 quartos - Centro',
        preco: 300000,
        detalhes: 'Centro | 80m² | 2 quartos | 1 banheiro',
        bairro: 'centro'
    },
    {
        id: 'IMOB006',
        imagem: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=300&auto=format&fit=crop',
        titulo: 'Apartamento 3 quartos - Centro',
        preco: 400000,
        detalhes: 'Centro | 100m² | 3 quartos | 2 banheiros',
        bairro: 'centro'
    },
    {
        id: 'IMOB007',
        imagem: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=300&auto=format&fit=crop',
        titulo: 'Apartamento 1 quarto - Centro',
        preco: 250000,
        detalhes: 'Centro | 70m² | 1 quarto | 1 banheiro',
        bairro: 'centro'
    },
    {
        id: 'IMOB008',
        imagem: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=300&auto=format&fit=crop',
        titulo: 'Apartamento 3 quartos - Centro',
        preco: 500000,
        detalhes: 'Centro | 120m² | 3 quartos | 2 banheiros',
        bairro: 'centro'
    }
];

// Infinite Scroll (imoveis.html)
if (document.getElementById('imoveis-lista')) {
    let currentPage = 1;
    const itemsPerPage = 4;
    let isLoading = false;

    function loadImoveis(filteredImoveis = imoveisData) {
        const lista = document.getElementById('imoveis-lista');
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const imoveisToShow = filteredImoveis.slice(0, end);

        imoveisToShow.forEach(imovel => {
            const card = document.createElement('div');
            card.className = 'imovel-card';
            card.innerHTML = `
                <div class="image-placeholder"></div>
                <img src="${imovel.imagem}" alt="${imovel.titulo}" loading="lazy" onload="this.classList.add('loaded')" onerror="this.src='https://via.placeholder.com/300x200?text=Imagem+Indisponível'; this.alt='Imagem fallback'; this.classList.add('loaded')">
                <div class="card-body">
                    <h5 class="card-title">${imovel.titulo}</h5>
                    <p class="card-text">R$ ${imovel.preco.toLocaleString('pt-BR')}</p>
                    <p class="card-text">${imovel.detalhes}</p>
                    <a href="imovel.html?id=${imovel.id}" class="btn btn-cta">Ver detalhes</a>
                </div>
            `;
            lista.appendChild(card);
        });

        document.getElementById('results-count').textContent = `${filteredImoveis.length} apartamento${filteredImoveis.length > 1 ? 's' : ''} encontrado${filteredImoveis.length > 1 ? 's' : ''}`;
        isLoading = false;
        document.getElementById('loader').style.display = 'none';
    }

    function handleInfiniteScroll() {
        if (isLoading) return;
        const lista = document.getElementById('imoveis-lista');
        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = lista.offsetTop + lista.offsetHeight - 200;

        if (scrollPosition >= threshold && currentPage * itemsPerPage < imoveisData.length) {
            isLoading = true;
            document.getElementById('loader').style.display = 'block';
            currentPage++;
            setTimeout(() => loadImoveis(imoveisData), 1000);
        }
    }

    // Load Filters from URL
    window.addEventListener('load', () => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.toString()) {
            document.getElementById('bairro').value = urlParams.get('bairro') || '';
            document.getElementById('precoMin').value = urlParams.get('precoMin') || '';
            document.getElementById('precoMax').value = urlParams.get('precoMax') || '';
            const filteredImoveis = imoveisData.filter(imovel => {
                const matchesBairro = !urlParams.get('bairro') || imovel.bairro === urlParams.get('bairro').toLowerCase();
                const matchesPreco = imovel.preco >= (parseInt(urlParams.get('precoMin')) || 0) && imovel.preco <= (parseInt(urlParams.get('precoMax')) || Infinity);
                return matchesBairro && matchesPreco;
            });
            loadImoveis(filteredImoveis);
        } else {
            loadImoveis();
        }
    });

    window.addEventListener('scroll', handleInfiniteScroll);
}

// Imóvel Detalhes (imovel.html)
if (document.getElementById('imovel-detalhes')) {
    const imoveis = {
        'IMOB001': {
            imagens: [
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop'
            ],
            titulo: 'Apartamento 3 quartos - Gleba Palhano',
            preco: 'R$ 600.000',
            detalhes: 'Gleba Palhano | 150m² | 3 quartos | 2 banheiros',
            descricao: 'Apartamento de alto padrão com vista para o Lago Igapó, 3 quartos, varanda gourmet e área de lazer completa.'
        },
        'IMOB002': {
            imagens: [
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop'
            ],
            titulo: 'Apartamento 4 quartos - Gleba Palhano',
            preco: 'R$ 800.000',
            detalhes: 'Gleba Palhano | 180m² | 4 quartos | 3 banheiros',
            descricao: 'Apartamento luxuoso com 4 suítes, acabamentos premium e área de lazer com piscina e academia.'
        },
        'IMOB003': {
            imagens: [
                'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop'
            ],
            titulo: 'Apartamento 2 quartos - Gleba Palhano',
            preco: 'R$ 450.000',
            detalhes: 'Gleba Palhano | 100m² | 2 quartos | 1 banheiro',
            descricao: 'Apartamento moderno com design compacto, ideal para casais, com localização privilegiada.'
        },
        'IMOB004': {
            imagens: [
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop'
            ],
            titulo: 'Apartamento 3 quartos - Gleba Palhano',
            preco: 'R$ 700.000',
            detalhes: 'Gleba Palhano | 160m² | 3 quartos | 2 banheiros',
            descricao: 'Apartamento espaçoso com 3 quartos, área de lazer completa e tecnologia smart home integrada.'
        },
        'IMOB005': {
            imagens: [
                'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop'
            ],
            titulo: 'Apartamento 2 quartos - Centro',
            preco: 'R$ 300.000',
            detalhes: 'Centro | 80m² | 2 quartos | 1 banheiro',
            descricao: 'Apartamento compacto no coração de Londrina, ideal para investidores ou casais jovens.'
        },
        'IMOB006': {
            imagens: [
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop'
            ],
            titulo: 'Apartamento 3 quartos - Centro',
            preco: 'R$ 400.000',
            detalhes: 'Centro | 100m² | 3 quartos | 2 banheiros',
            descricao: 'Apartamento bem localizado com 3 quartos, próximo a comércios e serviços.'
        },
        'IMOB007': {
            imagens: [
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop'
            ],
            titulo: 'Apartamento 1 quarto - Centro',
            preco: 'R$ 250.000',
            detalhes: 'Centro | 70m² | 1 quarto | 1 banheiro',
            descricao: 'Apartamento compacto ideal para solteiros ou investidores, com localização central.'
        },
        'IMOB008': {
            imagens: [
                'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop'
            ],
            titulo: 'Apartamento 3 quartos - Centro',
            preco: 'R$ 500.000',
            detalhes: 'Centro | 120m² | 3 quartos | 2 banheiros',
            descricao: 'Apartamento amplo com 3 quartos, acabamentos modernos e excelente localização.'
        }
    };

    let currentSlide = 0;
    let currentImovelImages = [];

    window.changeSlide = function(direction) {
        currentSlide += direction;
        if (currentSlide < 0) currentSlide = currentImovelImages.length - 1;
        if (currentSlide >= currentImovelImages.length) currentSlide = 0;
        const imagemElement = document.getElementById('imovel-imagem');
        imagemElement.classList.remove('loaded');
        imagemElement.src = currentImovelImages[currentSlide];
    };

    window.addEventListener('load', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        console.log('ID do imóvel:', id);

        const imagemElement = document.getElementById('imovel-imagem');
        const tituloElement = document.getElementById('imovel-titulo');
        const precoElement = document.getElementById('imovel-preco');
        const detalhesElement = document.getElementById('imovel-detalhes-texto');
        const descricaoElement = document.getElementById('imovel-descricao');
        const detalhesContainer = document.getElementById('imovel-detalhes');

        if (!id) {
            detalhesContainer.innerHTML = '<p class="error">Erro: Nenhum ID de imóvel fornecido. Por favor, volte e selecione um imóvel.</p>';
            console.error('Nenhum ID fornecido na URL');
            return;
        }

        const imovel = imoveis[id];
        console.log('Dados do imóvel:', imovel);

        if (imovel) {
            currentImovelImages = imovel.imagens;
            imagemElement.src = currentImovelImages[0];
            imagemElement.alt = imovel.titulo;
            imagemElement.classList.add('loaded');
            tituloElement.textContent = imovel.titulo;
            precoElement.textContent = imovel.preco;
            detalhesElement.textContent = imovel.detalhes;
            descricaoElement.textContent = imovel.descricao;
        } else {
            detalhesContainer.innerHTML = '<p class="error">Imóvel não encontrado. Verifique o ID ou tente outro imóvel.</p>';
            console.error(`Imóvel com ID ${id} não encontrado`);
        }
    });
}