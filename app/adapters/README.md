# Adapters

All adapters must export one or more of the methods outlined below.

## METHODS

### getLayout

The `getLayout` adapter method should return a layout object in the following format:

    {
        component: "OneColumnPageLayout",
        title: "Foo",
        collections: {
            navigation: [
                {
                    component: "article",
                    partial: "article320758238",
                    foo: "bar",
                    ...
                },
                ...
            ],
            main: [
                {
                    component: "ad",
                    partial: "ad04772737335",
                    ...
                },
                ...
            ],
            secondary: [
                {
                    foo: "bar",
                    ...
                },
                ...
            ]
        }
    }

