const hosts = {
    dev: ['localhost'],
    homolog: ['parkme.coffeecupdev.com'],
    prod: ['lucandrade.com.br', 'lucandrade.github.io']
}

const server = {
    dev: '//localhost:7000/',
    prod: '//contactlist.lucandrade.com.br/',
};

export default {
    get() {
        let regex;
        for (let e in hosts) {
            if (hosts[e]) {
                for (let h in hosts[e]) {
                    if (hosts[e][h]) {
                        regex = new RegExp(hosts[e][h]);
                        if (regex.test(window.location.href)) {
                            return e;
                        }
                    }
                }
            }
        }
    },
    isDev() {
        return this.get() === 'dev';
    },
    isHomolog() {
        return this.get() === 'homolog';
    },
    isProd() {
        return this.get() === 'prod';
    },
    server() {
        return server[this.get()];
    }
}
