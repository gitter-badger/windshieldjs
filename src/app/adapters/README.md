# Adapters

## pageAdapter(context)

The pageAdapter is a function which takes a context object and returns a page definition object.

Example Page Definition Object:

    {
        layout: "OneColumnPageLayout",
        title: "News",
        associations: {
            main: [
                {
                    component: "Ad",
                    partial: "Ad04772737335",
                    ...
                },
                ...
            ],
            secondary: [
                {
                    component: "Foo",
                    partial: "Foo12929812",
                    ...
                },
                ...
            ],
            ...
        }
    }

### associationAdapter(context)

The association adapter is a function which takes a context object and returns an
associations object (an object where each property is a collections of components

Example Associations Object:

    {
        header: [
            {
                component: "Buy",
                partial: "Buy9389712789",
                ...
            },
            ...
        ],
        footer: [
            {
                component: "Sell",
                partial: "Sell239123921",
                ...
            },
            ...
        ],
        ...
    }

