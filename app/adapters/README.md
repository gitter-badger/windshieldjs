# Adapters

## METHODS

### getPageDef(request)

The `getPageDef` adapter method takes a request object and returns a page
definition object.

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

