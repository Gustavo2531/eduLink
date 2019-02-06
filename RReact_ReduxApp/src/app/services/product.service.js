const url = "http://localhost:8000/products";

const productsApiClient = {
    getAllProducts: function () {
        var promise = new Promise((resolve, reject) => {
            return fetch(url).then((res) => {
                var result = res.json();
                result.then((jResult) => {
                    resolve(jResult);
                }, (err) => {
                    reject("JSON Parse Error");
                });
            }).catch((err) => {
                reject("Error connecting to the API");
            });
        });

        return promise;
    },
    
    insertProduct: function (p) {
        const request = new Request(url, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(p)
        });

        return fetch(request).then(res => {
            return res.json()
        }).catch(error => {
            return error;
        });
    },

    updateProduct: function (p) {
        const request = new Request(url + "/" + p.id, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(p)
        });

        return fetch(request).then(res => {
            return res.json()
        }).catch(error => {
            return error;
        });
    },

    deleteProduct: function (p) {
        const request = new Request(url + "/" + p.id, {
            method: "DELETE"
        });

        return fetch(request).then(res => {
            return res.json();
        }).catch(error => {
            return error;
        });
    }
};

export default productsApiClient;