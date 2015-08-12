# Adapters

All adapters must export one or more of the methods outlined below.

## METHODS

### owcsAdapter.getLayout(request)

The `getLayout` adapter method takes a request object and returns a layout object in the following format:

    {
        component: "OneColumnPageLayout",
        title: "Foo",
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

