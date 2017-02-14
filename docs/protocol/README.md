# Communication Protocol

To represent the keys to press on the server we send the following JSON object:

```js
keypress: {
    Y: false,
    X: false,
    B: false,
    A: false,
    left: false,
    right: false,
    up: false,
    down: false
}
```

As we can see all values are `Boolean` and there are 8 values. That said I suppose we can convert these values to a byte.

So the new protocol obbeys the table:

byte | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0
--- | --- | --- | --- | --- |:---:|:---:|:---:|:---:
Key | Y | X | B | A | left | right | up | down

In this configuration we can trade the String

```json
"{"Y":false,"X":false,"B":false,"A":false,"left":false,"right":false,"up":false,"down":false}"
```

to

```
000000000
```

This is much more compact and lightweight.
