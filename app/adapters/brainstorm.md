Page Definition Format

    {
        layout: "OneColumnPageLayout",
        title: "News",
        associations: {
            header: [
                {
                    component: "Header",
                    datasource: "carsContent"
                }
            ],
            footer: [
                {
                    component: "Footer",
                    datasource: "carsContent"
                }
            ],
            main: [
                {
                    component: "Ad"
                },
                {
                    component: "CuratedArticles",
                    query: {
                        field: "name",
                        operations: "equals",
                        value: "Top Stories"
                    }
                },
                {
                    component: "Ad"
                },
                {
                    component: "CuratedTag",
                    query: {
                        field: "name",
                        value: "Toyota"
                    }
                },
                {
                    component: "CuratedTag"
                },
                {
                    component: "CuratedTag"
                },
                {
                    component: "LatestPublishedArticles"
                },
                {
                    component: "Ad"
                }
            ],
            secondary: [
                {
                    component: "Article",
                    datasource: "owcsAdapter"
                    ...
                },
                ...
            ],
            ...
        }
    }

