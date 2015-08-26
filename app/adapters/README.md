# Adapters

## METHODS

### getPageDef(request)

The `getPageDef` adapter method takes a request object and returns a page
definition object.

Example Page Definition Object:

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

