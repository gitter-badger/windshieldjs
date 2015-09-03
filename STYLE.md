# Coding Conventions

## JavaScript

### Language

#### Semicolon

  - Always end statements with `;`

```javascript
// Right
console.log('even when not required');

// Wrong
console.log('even when not required')
```

#### Variable declarations

  - Declare at top of function
  - Chain declarations whenever possible;
  - Give descriptive names
    - Do not use similar names or synonyms for different variables unless following a convention
    - `for...in` iterators should use descriptive names
    - `for` iterators should use single character names
    - Use combination of plural for array and singular for each item in the array
  - Use camelCase, never underscores
  - Avoid using numbered variables (e.g. i1, i2, i3)

#### Scope

  - Use implicit or single statement scopes sparingly -- use your best judgement and when in doubt wrap your scope in `{}`

```javascript
// Prefer

if (condition) {
    return;
}

// Use sparingly

if (condition) return;
```

#### For loops

  - Prefer `Array.prototype.forEach` over `for` whenever possible.
  - When using `for` loops, iterator variable should be declared inside the `for` parentheses, unless already defined
  - Use `for` with arrays, `for...in` for objects (and always check `hasOwnProperty()`)
  - When iterating over a fixed or calculated size, assign size to a variable inside the `for` declaration and use iterator variable name with `l` suffix
  - Always `++i`, never `i++`

```javascript
// Right

var name = 'john';

for (var i = 0, il = name.length; i < il; ++i) {
    console.log(name[i]);
}

// Wrong

var position;
var name = 'john';

for (position = 0; position < name.length; position++) {
    console.log(name[position]) ;
}
```

#### Prototype members

  - Prefix private members with `_`

```javascript
Example.prototype.method = function () {

    this.public = 'external';
    this._private = 'internal';
};
```

  - Define `self` for passing `this` into nested functions

```javascript
Example.prototype.method = function () {

    var self = this;

    call(123, function (err) {

        self.display(err);
    });
};
```

#### Function declaration

  - Prefer function declarations over function assignments
``` javascript
// Prefer declaration when possible

function myFunction() {

}

// Use assignment where it makes sense

module.exports = function myFunction () {

};
```

#### Enforcing new on Constructor

  - Use `this instanceof` to check if a constructor function was called with new. (This allows for future prototypical inheritance.)

```javascript
expect(this instanceof Server).toEqual(true);
```

### Style

#### Whitespace

  - Always spaces, never tabs
  - 4 spaces indents
  - No trailing whitespace at end-of-line

```javascript
// Right

if (test) {
    if (value === 12) {
        console.log('result');
    }
}

// Wrong

if (test) {
  if (value === 12) {
    console.log('result');
  }
}
```

#### String literals

  - Use `'` for strings which are used for internal logic and `"` for strings which are exposed to the user.

```javascript
// Right
var key = 'someKey',
    message = "message for the user";

// Wrong
var key = "someKey",
    message = 'message for the user';
```

#### Newlines

  - all files need to end with a newline (or more accurately end of line).  IDEs will often do a line separator instead.  This is to ensure it is unix friendly.  The "cat" command is a good example of seeing this behavior.  Git does a good job of pointing these out when doing pull requests.

  - Newline after `{` except for inlined or empty objects
    - Inline an object when it improves readability and unlikely to change often
    - No inline object in assignment unless empty

```javascript
// Right

if (condition) {
    execute(value, { strict: true });
}

if (condition) {
    var options = {
        strict: true
    };
    execute(value, options);
}

var empty = {};

// Wrong

if (condition) { execute(value, { strict: true }); }

if (condition) {
    var options = { strict: true };
    execute(value, options);
}

var empty = {
};
```

  - Newline after `}`
    - Only exception is when followed by `,`, `;`, `);` which must be followed by a newline
    - Includes before `else`, `catch`, etc.
    - Empty line after `}` if not last statement in scope

```javascript
// Right

if (condition) {
    value = {
        func: function () {
            console.log('example');
        },
        message: 'hello'
    };
    execute(value, function (err) {
        console.log(err);
    });
}
else {
    console.log('otherwise');
}

// Wrong

if (condition) {
    value = {
        func: function () {
            console.log('example');
        }, message: 'hello'
    };
    execute(value, function (err) {
        console.log(err); }
    );
} else {
    console.log('otherwise');
}
```

  - No empty line before end of scope

```javascript
// Right

if (condition) {
    if (otherCondition) {
        console.log('done');
    }
}

// Wrong

if (condition) {
    if (otherCondition) {
        console.log('done');

    }

}
```

#### Spaces

  - Use one and only one space (when required)

```javascript
// Right
var value = calculate(1, 3);

// Wrong
var  value =  calculate(1,  3);
```

  - One space between function and `(` when assigning a function

```javascript
// Right

var example = function () {
    return value;
};

// Wrong

var example = function() {
    return value;
};
```

  - No space between function and `(` when declaring a function

```javascript
// Right

function example() {
    return value;
};

// Wrong

function example () {
    return value;
};
```

  - No space between function name and `(` when invoking a function

```javascript
// Right

var key = example();

// Wrong

var key = example ();
```

  - No space after `(` or before `)`

```javascript
// Right

execute('order', 34);

if (result === 'ok') {
    console.log('success');
}

// Wrong

execute( 'order', 34 );

if ( result === 'ok' ) {
    console.log( 'success' );
}
`

- No space before object key `:`, always after object key `:`

```javascript
// Right

var obj = {
    a: 1,
    b: 2,
    c: 3
};

// Wrong

var obj = {
    a : 1,
    b :2,
    c:3
};
`

- No space before `;`, always after `;` if not end-of-line

```javascript
// Right

var name = 'john';

for (var i = 0, il = name.length; i < il; ++i) {
    console.log(name[i]);
}

// Wrong

var name = 'john' ;

for (var i = 0, il = name.length;i < il ;++i) {
    console.log(name[i]) ;
}
`

- Always space after reserved keywords (`if`, `else`, `for`, `return`, `function`, etc.)

```javascript
// Right

for (var book in books) {
    if (books.hasOwnProperty(book)) {
        console.log(book.name);
    }
}

// Wrong

for(var book in books) {
    if(books.hasOwnProperty(book)) {
        console.log(book.name);
    }
}
```

  - Always space after `{` and before `}` in inlined object
    - No space for empty objects `{}`
    - No space for empty functions `{}`

```javascript
// Right

var user = { name: 'john', email: 'john@example.com' };
var empty = {};
var callback = function () {};

// Wrong

var user = {name: 'john', email: 'john@example.com'};
var empty = {  };
var callback = function () { };
```

  - No space after `[` and before `]` in inlined arrays

```javascript
// Right
var numbers = [1, 2, 3];

// Wrong
var numbers = [ 1, 2, 3 ];
```

  - Always space after `//`

```javascript
// Right
// Some comment

// Wrong
//Some comment
```

  - No space before `,`, always after `,` unless end-of-line

```javascript
// Right

var numbers = [1, 2, 3];
var user = { name: 'john', email: 'john@example.com' };

for (var i = 0, il = name.length; i < il; ++i) {
    console.log(name[i]);
}

// Wrong

var numbers = [1,2 ,3];
var user = { name: 'john',email: 'john@example.com' };

for (var i = 0,il = name.length; i < il; ++i) {
    console.log(name[i]);
}
```

  - Always space before and after operators, unless following an indent or end-of-line

```javascript
// Right

var a = 1 + 3;
var b = 'john' +
        ' ' +
        'doe';

// Wrong

var a=1+3;
var b='john'+
      ' '+
      'doe';
```

#### Commas

  - Never begin a line with `,` (always at the end of the previous line)

```javascript
// Right
execute('some error message',
        12345,
        this);

// Wrong
execute('some error message'
        ,12345
        ,this);
```

#### Operators

  - Never begin a line with an operator (always at the end of the previous line)

```javascript
// Right

var message = 'Hello ' +
              'Steve, ' +
              'How are you?';

if (value === 'hello' &&
    result === 'ok') {

    console.log('yes');
}

// Wrong

var message = 'Hello '
              + 'Steve, '
              + 'How are you?';

if (value === 'hello'
    && result === 'ok') {

    console.log('yes');
}
```

#### Comments

  - Always use `//` unless it's a jsDoc declaration or license header
  - Always begin sentences with an upper case
  - No trailing `.` unless comment contains multiple sentences
  - Formal style, consistent voice, no humor, present tense
  - No developer name or other personal notes
  - No TODOs

  - Line
    - Provides narrative for the following single code line (or single statement broken for readability)
    - One line of comment only
    - One empty line before and none after the comment line
    - No empty line before when following `{` unless other rules require it

```javascript
function execute() {

    // Initialize state
    var position = 0;

    if (condition) {
        // Return message
        return 'hello';
    }
}
```

  - Segment
    - Provides narrative for the following code section (one or more lines of code, with or without line breaks)
    - One or more lines of comments
    - One empty line before and one after comments block

```javascript
function execute() {

    // Print each book's name

    for (var book in books) {

        // Check for valid properties

        if (books.hasOwnProperty(book)) {
            console.log(book.name);
        }
    }
}
```

  - Note
    - Explains the behaviour of a single code statement (can be broken into multiple lines)
    - Used to document unexpected behaviour or non-standard practice
    - Appears immediately at the end of the line (or statement) it describes, following whitespace to separate it from code block

```javascript
function execute(value) {

    if (value !== null &&
        value !== undefined) {      // Explicit check as 'value' can be 0

        console.log(value);
    }
}
```

#### Multi-line statements

  - Statements should only be broken into multiple lines to improve readability
  - Break statements if they are longer than 150 characters long
  - No empty lines in the middle of a single statement
  - Indent multi-line statements

  - Conditions should be indented to the first character of the condition in the first line

```javascript
if (result &&
    result.status &&
    result.status.statusCode === 200) {

    console.log('success');
}
```

  - Variable should be indented to the first character of the value in the first line

```javascript
var message = 'hello' +
              ' and welcome';
```

## Node

### Require

  - Use uppercase variable names for imported modules
  - All require statements must be declared at the top of the module
  - Always use relative paths

### Variable names

  - `err` is reserved for errors received via a callback. Use `error` for local function variables

### Callback

  - First argument must always be `err`
  - If a function takes a `callback` argument, it **must** be called on `process.nextTick()`. Otherwise, the argument name **must** be `next` to clearly declare that it may get called on same tick
  - Callbacks should always be called with explicit `return`
