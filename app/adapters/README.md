# Adapters

All adapters must export one or more of the methods outlined below.

## METHODS

### owcsAdapter.getLayout(request)

The `getLayout` adapter method takes a request object and returns a layout object.

Example Layout Object:

    {
        component: "OneColumnPageLayout",
        title: "News",
        collections: {
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
                    foo: "bar",
                    ...
                },
                ...
            ],
            ...
        }
    }

