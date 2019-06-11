(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (!x.$)
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



// SEND REQUEST

var _Http_toTask = F2(function(request, maybeProgress)
{
	return _Scheduler_binding(function(callback)
	{
		var xhr = new XMLHttpRequest();

		_Http_configureProgress(xhr, maybeProgress);

		xhr.addEventListener('error', function() {
			callback(_Scheduler_fail(elm$http$Http$NetworkError));
		});
		xhr.addEventListener('timeout', function() {
			callback(_Scheduler_fail(elm$http$Http$Timeout));
		});
		xhr.addEventListener('load', function() {
			callback(_Http_handleResponse(xhr, request.expect.a));
		});

		try
		{
			xhr.open(request.method, request.url, true);
		}
		catch (e)
		{
			return callback(_Scheduler_fail(elm$http$Http$BadUrl(request.url)));
		}

		_Http_configureRequest(xhr, request);

		var body = request.body;
		xhr.send(elm$http$Http$Internal$isStringBody(body)
			? (xhr.setRequestHeader('Content-Type', body.a), body.b)
			: body.a
		);

		return function() { xhr.abort(); };
	});
});

function _Http_configureProgress(xhr, maybeProgress)
{
	if (!elm$core$Maybe$isJust(maybeProgress))
	{
		return;
	}

	xhr.addEventListener('progress', function(event) {
		if (!event.lengthComputable)
		{
			return;
		}
		_Scheduler_rawSpawn(maybeProgress.a({
			bytes: event.loaded,
			bytesExpected: event.total
		}));
	});
}

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}

	xhr.responseType = request.expect.b;
	xhr.withCredentials = request.withCredentials;

	elm$core$Maybe$isJust(request.timeout) && (xhr.timeout = request.timeout.a);
}


// RESPONSES

function _Http_handleResponse(xhr, responseToResult)
{
	var response = _Http_toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(elm$http$Http$BadStatus(response));
	}

	var result = responseToResult(response);

	if (elm$core$Result$isOk(result))
	{
		return _Scheduler_succeed(result.a);
	}
	else
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(A2(elm$http$Http$BadPayload, result.a, response));
	}
}

function _Http_toResponse(xhr)
{
	return {
		url: xhr.responseURL,
		status: { code: xhr.status, message: xhr.statusText },
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders()),
		body: xhr.response
	};
}

function _Http_parseHeaders(rawHeaders)
{
	var headers = elm$core$Dict$empty;

	if (!rawHeaders)
	{
		return headers;
	}

	var headerPairs = rawHeaders.split('\u000d\u000a');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf('\u003a\u0020');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(elm$core$Dict$update, key, function(oldValue) {
				return elm$core$Maybe$Just(elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}

	return headers;
}


// EXPECTORS

function _Http_expectStringResponse(responseToResult)
{
	return {
		$: 0,
		b: 'text',
		a: responseToResult
	};
}

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		b: expect.b,
		a: function(response) {
			var convertedResponse = expect.a(response);
			return A2(elm$core$Result$map, func, convertedResponse);
		}
	};
});


// BODY

function _Http_multipart(parts)
{


	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}

	return elm$http$Http$Internal$FormDataBody(formData);
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm$core$Result$Ok(value)
				: (value instanceof String)
					? elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return elm$core$Maybe$Nothing;
	}
}

// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		out.push(A4(elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		return replacer(A4(elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2(elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		(key !== 'value' || key !== 'checked' || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		value
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		value
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			var oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			var newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.download)
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var author$project$Main$LinkClicked = function (a) {
	return {$: 'LinkClicked', a: a};
};
var author$project$Main$UrlChanged = function (a) {
	return {$: 'UrlChanged', a: a};
};
var author$project$Main$AddProjectMsg = function (a) {
	return {$: 'AddProjectMsg', a: a};
};
var author$project$Main$AddTimelogMsg = function (a) {
	return {$: 'AddTimelogMsg', a: a};
};
var author$project$Main$EditProjectMsg = function (a) {
	return {$: 'EditProjectMsg', a: a};
};
var author$project$Main$EditTimelogMsg = function (a) {
	return {$: 'EditTimelogMsg', a: a};
};
var author$project$Main$ProfileMsg = function (a) {
	return {$: 'ProfileMsg', a: a};
};
var author$project$Main$ProjectMsg = function (a) {
	return {$: 'ProjectMsg', a: a};
};
var author$project$Main$TimelogMsg = function (a) {
	return {$: 'TimelogMsg', a: a};
};
var author$project$Main$UserMsg = function (a) {
	return {$: 'UserMsg', a: a};
};
var elm$core$Basics$False = {$: 'False'};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$http$Http$Internal$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var elm$http$Http$header = elm$http$Http$Internal$Header;
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$List$cons = _List_cons;
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var author$project$Api$requestOptions = function (csrf) {
	return {
		headers: _List_fromArray(
			[
				A2(elm$http$Http$header, 'X-CSRFToken', csrf)
			]),
		method: 'POST',
		timeout: elm$core$Maybe$Nothing,
		url: '/graphql',
		withCredentials: false
	};
};
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$core$Task$fail = _Scheduler_fail;
var elm$core$Task$onError = _Scheduler_onError;
var elm$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			elm$core$Task$onError,
			A2(elm$core$Basics$composeL, elm$core$Task$fail, convert),
			task);
	});
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$http$Http$Internal$Request = function (a) {
	return {$: 'Request', a: a};
};
var elm$http$Http$request = elm$http$Http$Internal$Request;
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === 'RBNode_elm_builtin') {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === 'RBNode_elm_builtin') {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === 'RBNode_elm_builtin') {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (_n0.$ === 'Just') {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$Basics$True = {$: 'True'};
var elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$http$Http$BadPayload = F2(
	function (a, b) {
		return {$: 'BadPayload', a: a, b: b};
	});
var elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var elm$http$Http$NetworkError = {$: 'NetworkError'};
var elm$http$Http$Timeout = {$: 'Timeout'};
var elm$http$Http$Internal$FormDataBody = function (a) {
	return {$: 'FormDataBody', a: a};
};
var elm$http$Http$Internal$isStringBody = function (body) {
	if (body.$ === 'StringBody') {
		return true;
	} else {
		return false;
	}
};
var elm$http$Http$toTask = function (_n0) {
	var request_ = _n0.a;
	return A2(_Http_toTask, request_, elm$core$Maybe$Nothing);
};
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$GraphQLError = function (a) {
	return {$: 'GraphQLError', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError = function (a) {
	return {$: 'HttpError', a: a};
};
var elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$list = _Json_decodeList;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$oneOf = _Json_oneOf;
var elm$json$Json$Decode$string = _Json_decodeString;
var elm$json$Json$Decode$succeed = _Json_succeed;
var jamesmacaulay$elm_graphql$GraphQL$Response$RequestError = F2(
	function (message, locations) {
		return {locations: locations, message: message};
	});
var elm$json$Json$Decode$int = _Json_decodeInt;
var jamesmacaulay$elm_graphql$GraphQL$Response$DocumentLocation = F2(
	function (line, column) {
		return {column: column, line: line};
	});
var jamesmacaulay$elm_graphql$GraphQL$Response$documentLocationDecoder = A3(
	elm$json$Json$Decode$map2,
	jamesmacaulay$elm_graphql$GraphQL$Response$DocumentLocation,
	A2(elm$json$Json$Decode$field, 'line', elm$json$Json$Decode$int),
	A2(elm$json$Json$Decode$field, 'column', elm$json$Json$Decode$int));
var jamesmacaulay$elm_graphql$GraphQL$Response$errorsDecoder = elm$json$Json$Decode$list(
	A3(
		elm$json$Json$Decode$map2,
		jamesmacaulay$elm_graphql$GraphQL$Response$RequestError,
		A2(elm$json$Json$Decode$field, 'message', elm$json$Json$Decode$string),
		elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					elm$json$Json$Decode$field,
					'locations',
					elm$json$Json$Decode$list(jamesmacaulay$elm_graphql$GraphQL$Response$documentLocationDecoder)),
					elm$json$Json$Decode$succeed(_List_Nil)
				]))));
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$errorsResponseDecoder = A2(elm$json$Json$Decode$field, 'errors', jamesmacaulay$elm_graphql$GraphQL$Response$errorsDecoder);
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$convertHttpError = F3(
	function (wrapHttpError, wrapGraphQLError, httpError) {
		var handleErrorWithResponseBody = function (responseBody) {
			return A2(
				elm$core$Result$withDefault,
				wrapHttpError(httpError),
				A2(
					elm$core$Result$map,
					wrapGraphQLError,
					A2(elm$json$Json$Decode$decodeString, jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$errorsResponseDecoder, responseBody)));
		};
		switch (httpError.$) {
			case 'BadStatus':
				var body = httpError.a.body;
				return handleErrorWithResponseBody(body);
			case 'BadPayload':
				var body = httpError.b.body;
				return handleErrorWithResponseBody(body);
			default:
				return wrapHttpError(httpError);
		}
	});
var elm$http$Http$Internal$EmptyBody = {$: 'EmptyBody'};
var elm$http$Http$emptyBody = elm$http$Http$Internal$EmptyBody;
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$core$String$contains = _String_contains;
var elm$url$Url$percentEncode = _Url_percentEncode;
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$parameterizedUrl = F3(
	function (url, documentString, variableValues) {
		var variablesParam = A2(
			elm$core$Maybe$withDefault,
			'',
			A2(
				elm$core$Maybe$map,
				function (obj) {
					return '&variables=' + elm$url$Url$percentEncode(
						A2(elm$json$Json$Encode$encode, 0, obj));
				},
				variableValues));
		var firstParamPrefix = A2(elm$core$String$contains, '?', url) ? '&' : '?';
		var queryParam = firstParamPrefix + ('query=' + elm$url$Url$percentEncode(documentString));
		return _Utils_ap(
			url,
			_Utils_ap(queryParam, variablesParam));
	});
var elm$http$Http$Internal$StringBody = F2(
	function (a, b) {
		return {$: 'StringBody', a: a, b: b};
	});
var elm$http$Http$jsonBody = function (value) {
	return A2(
		elm$http$Http$Internal$StringBody,
		'application/json',
		A2(elm$json$Json$Encode$encode, 0, value));
};
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var elm$json$Json$Encode$string = _Json_wrap;
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$postBodyJson = F2(
	function (documentString, variableValues) {
		var extraParams = A2(
			elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				elm$core$Maybe$map,
				function (obj) {
					return _List_fromArray(
						[
							_Utils_Tuple2('variables', obj)
						]);
				},
				variableValues));
		var documentValue = elm$json$Json$Encode$string(documentString);
		return elm$json$Json$Encode$object(
			_Utils_ap(
				_List_fromArray(
					[
						_Utils_Tuple2('query', documentValue)
					]),
				extraParams));
	});
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$postBody = F2(
	function (documentString, variableValues) {
		return elm$http$Http$jsonBody(
			A2(jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$postBodyJson, documentString, variableValues));
	});
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$requestConfig = F4(
	function (requestOptions, documentString, expect, variableValues) {
		var _n0 = (requestOptions.method === 'GET') ? _Utils_Tuple2(
			A3(jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$parameterizedUrl, requestOptions.url, documentString, variableValues),
			elm$http$Http$emptyBody) : _Utils_Tuple2(
			requestOptions.url,
			A2(jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$postBody, documentString, variableValues));
		var url = _n0.a;
		var body = _n0.b;
		return {body: body, expect: expect, headers: requestOptions.headers, method: requestOptions.method, timeout: requestOptions.timeout, url: url, withCredentials: requestOptions.withCredentials};
	});
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Tuple$mapSecond = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$json$Json$Encode$float = _Json_wrap;
var elm$json$Json$Encode$int = _Json_wrap;
var elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var elm$json$Json$Encode$null = _Json_encodeNull;
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Value$Json$Encode$encode = function (value) {
	switch (value.$) {
		case 'VariableValue':
			return elm$json$Json$Encode$null;
		case 'IntValue':
			var _int = value.a;
			return elm$json$Json$Encode$int(_int);
		case 'FloatValue':
			var _float = value.a;
			return elm$json$Json$Encode$float(_float);
		case 'StringValue':
			var string = value.a;
			return elm$json$Json$Encode$string(string);
		case 'BooleanValue':
			var bool = value.a;
			return elm$json$Json$Encode$bool(bool);
		case 'NullValue':
			return elm$json$Json$Encode$null;
		case 'EnumValue':
			var string = value.a;
			return elm$json$Json$Encode$string(string);
		case 'ListValue':
			var values = value.a;
			return A2(elm$json$Json$Encode$list, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Value$Json$Encode$encode, values);
		default:
			var kvPairs = value.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$map,
					elm$core$Tuple$mapSecond(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Value$Json$Encode$encode),
					kvPairs));
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$variableValuesToJson = function (kvPairs) {
	return elm$core$List$isEmpty(kvPairs) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(
		elm$json$Json$Encode$object(
			A2(
				elm$core$List$map,
				elm$core$Tuple$mapSecond(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Value$Json$Encode$encode),
				kvPairs)));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$jsonVariableValues = function (_n0) {
	var variableValues = _n0.a.variableValues;
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$variableValuesToJson(variableValues);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$requestBody = function (_n0) {
	var requestRecord = _n0.a;
	return requestRecord.documentString;
};
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$sendExpecting = F3(
	function (expect, requestOptions, request) {
		var variableValues = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$jsonVariableValues(request);
		var documentString = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$requestBody(request);
		return A2(
			elm$core$Task$mapError,
			A2(jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$convertHttpError, jamesmacaulay$elm_graphql$GraphQL$Client$Http$HttpError, jamesmacaulay$elm_graphql$GraphQL$Client$Http$GraphQLError),
			elm$http$Http$toTask(
				elm$http$Http$request(
					A4(jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$requestConfig, requestOptions, documentString, expect, variableValues))));
	});
var elm$http$Http$expectStringResponse = _Http_expectStringResponse;
var elm$http$Http$expectJson = function (decoder) {
	return elm$http$Http$expectStringResponse(
		function (response) {
			var _n0 = A2(elm$json$Json$Decode$decodeString, decoder, response.body);
			if (_n0.$ === 'Err') {
				var decodeError = _n0.a;
				return elm$core$Result$Err(
					elm$json$Json$Decode$errorToString(decodeError));
			} else {
				var value = _n0.a;
				return elm$core$Result$Ok(value);
			}
		});
};
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$defaultExpect = A2(
	elm$core$Basics$composeL,
	elm$http$Http$expectJson,
	elm$json$Json$Decode$field('data'));
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$responseDataDecoder = function (_n0) {
	var requestRecord = _n0.a;
	return requestRecord.responseDataDecoder;
};
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$send = F2(
	function (options, request) {
		var expect = jamesmacaulay$elm_graphql$GraphQL$Client$Http$Util$defaultExpect(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$responseDataDecoder(request));
		return A3(jamesmacaulay$elm_graphql$GraphQL$Client$Http$sendExpecting, expect, options, request);
	});
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendQuery = jamesmacaulay$elm_graphql$GraphQL$Client$Http$send;
var author$project$Api$sendQueryRequest = F2(
	function (csrf, request) {
		var options = author$project$Api$requestOptions(csrf);
		return A2(jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendQuery, options, request);
	});
var author$project$Api$UuidType = {$: 'UuidType'};
var danyx23$elm_uuid$Uuid$Uuid = function (a) {
	return {$: 'Uuid', a: a};
};
var elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var elm$regex$Regex$fromString = function (string) {
	return A2(
		elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var elm$regex$Regex$never = _Regex_never;
var danyx23$elm_uuid$Uuid$Barebones$uuidRegex = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	elm$regex$Regex$fromString('^[0-9A-Fa-f]{8,8}-[0-9A-Fa-f]{4,4}-[1-5][0-9A-Fa-f]{3,3}-[8-9A-Ba-b][0-9A-Fa-f]{3,3}-[0-9A-Fa-f]{12,12}$'));
var elm$regex$Regex$contains = _Regex_contains;
var danyx23$elm_uuid$Uuid$Barebones$isValidUuid = function (uuidAsString) {
	return A2(elm$regex$Regex$contains, danyx23$elm_uuid$Uuid$Barebones$uuidRegex, uuidAsString);
};
var elm$core$String$toLower = _String_toLower;
var danyx23$elm_uuid$Uuid$fromString = function (text) {
	return danyx23$elm_uuid$Uuid$Barebones$isValidUuid(text) ? elm$core$Maybe$Just(
		danyx23$elm_uuid$Uuid$Uuid(
			elm$core$String$toLower(text))) : elm$core$Maybe$Nothing;
};
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$fail = _Json_fail;
var danyx23$elm_uuid$Uuid$decoder = A2(
	elm$json$Json$Decode$andThen,
	function (string) {
		var _n0 = danyx23$elm_uuid$Uuid$fromString(string);
		if (_n0.$ === 'Just') {
			var uuid = _n0.a;
			return elm$json$Json$Decode$succeed(uuid);
		} else {
			return elm$json$Json$Decode$fail('Not a valid UUID');
		}
	},
	elm$json$Json$Decode$string);
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType = function (a) {
	return {$: 'SpecifiedType', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec = F4(
	function (a, b, c, d) {
		return {$: 'ValueSpec', a: a, b: b, c: c, d: d};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$SelectionSet = function (a) {
	return {$: 'SelectionSet', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet = jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$SelectionSet(_List_Nil);
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$NonNullFlag = {$: 'NonNullFlag'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$NonNullFlag;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec = F2(
	function (coreType, decoder) {
		return A4(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
				{coreType: coreType, join: elm$core$Basics$always, nullability: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag, selectionSet: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet}),
			elm$core$Basics$always(decoder),
			_List_Nil,
			_List_Nil);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar = F2(
	function (customTypeMarker, decoder) {
		return A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec, customTypeMarker, decoder);
	});
var author$project$Api$uuid = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, author$project$Api$UuidType, danyx23$elm_uuid$Uuid$decoder);
var author$project$Types$User$Account = F4(
	function (id, name, accType, globalWorkDayHours) {
		return {accType: accType, globalWorkDayHours: globalWorkDayHours, id: id, name: name};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec = F4(
	function (a, b, c, d) {
		return {$: 'SelectionSpec', a: a, b: b, c: c, d: d};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$getAST = function (_n0) {
	var ast = _n0.a;
	return ast;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$argumentsAST = elm$core$List$map(
	elm$core$Tuple$mapSecond(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$getAST));
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType = function (sourceType) {
	if (sourceType.$ === 'SpecifiedType') {
		var selectionSet = sourceType.a.selectionSet;
		return selectionSet;
	} else {
		return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet;
	}
};
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$getVariables = function (_n0) {
	var vars = _n0.b;
	return vars;
};
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$Basics$not = _Basics_not;
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableDefinition = function (a) {
	return {$: 'VariableDefinition', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$toDefinitionAST = function (_var) {
	if (_var.$ === 'RequiredVariable') {
		var variableName = _var.a;
		var typeRef = _var.b;
		return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableDefinition(
			{defaultValue: elm$core$Maybe$Nothing, name: variableName, variableType: typeRef});
	} else {
		var variableName = _var.a;
		var typeRef = _var.b;
		var defaultValue = _var.d;
		return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableDefinition(
			{
				defaultValue: elm$core$Maybe$Just(defaultValue),
				name: variableName,
				variableType: typeRef
			});
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$variableIsNotInList = F2(
	function (existingVars, thisVar) {
		var thisVarAST = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$toDefinitionAST(thisVar);
		var sameASTAsThisVar = function (_var) {
			return _Utils_eq(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$toDefinitionAST(_var),
				thisVarAST);
		};
		return !A2(elm$core$List$any, sameASTAsThisVar, existingVars);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$mergeVariables = F2(
	function (varsA, varsB) {
		return _Utils_ap(
			varsA,
			A2(
				elm$core$List$filter,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$variableIsNotInList(varsA),
				varsB));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$varsFromArguments = function (_arguments) {
	return A3(
		elm$core$List$foldr,
		A2(
			elm$core$Basics$composeR,
			elm$core$Tuple$second,
			A2(elm$core$Basics$composeR, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$getVariables, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$mergeVariables)),
		_List_Nil,
		_arguments);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Field = function (a) {
	return {$: 'Field', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field = F3(
	function (name, _arguments, _n0) {
		var sourceType = _n0.a;
		var decoder = _n0.b;
		var fieldVars = _n0.c;
		var fragments = _n0.d;
		var vars = A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$mergeVariables,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$varsFromArguments(_arguments),
			fieldVars);
		var astFieldInfo = {
			alias: elm$core$Maybe$Nothing,
			_arguments: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$argumentsAST(_arguments),
			directives: _List_Nil,
			name: name,
			selectionSet: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(sourceType)
		};
		return A4(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SelectionSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Field(astFieldInfo),
			decoder,
			vars,
			fragments);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$IntType = {$: 'IntType'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$IntType, elm$json$Json$Decode$int);
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ObjectType = {$: 'ObjectType'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptyObjectSpecifiedType = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
	{coreType: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ObjectType, join: elm$core$Basics$always, nullability: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag, selectionSet: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptySelectionSet});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object = function (ctr) {
	return A4(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$emptyObjectSpecifiedType,
		elm$core$Basics$always(
			elm$json$Json$Decode$succeed(ctr)),
		_List_Nil,
		_List_Nil);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$StringType = {$: 'StringType'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$StringType, elm$json$Json$Decode$string);
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Util$responseKey = function (fieldInfo) {
	var _n0 = fieldInfo.alias;
	if (_n0.$ === 'Nothing') {
		return fieldInfo.name;
	} else {
		var alias = _n0.a;
		return alias;
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionDecoder = F2(
	function (selectionAST, decoder) {
		if (selectionAST.$ === 'Field') {
			var fieldInfo = selectionAST.a;
			return A2(
				elm$core$Basics$composeL,
				elm$json$Json$Decode$field(
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Util$responseKey(fieldInfo)),
				decoder);
		} else {
			return decoder;
		}
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract = function (_n0) {
	var selectionAST = _n0.a;
	var decoder = _n0.b;
	var vars = _n0.c;
	var fragments = _n0.d;
	return A4(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
			{
				coreType: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ObjectType,
				join: elm$core$Basics$always,
				nullability: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag,
				selectionSet: jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$SelectionSet(
					_List_fromArray(
						[selectionAST]))
			}),
		A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionDecoder, selectionAST, decoder),
		vars,
		fragments);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mergeSelectionSets = F2(
	function (_n0, _n1) {
		var selectionsA = _n0.a;
		var selectionsB = _n1.a;
		return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$SelectionSet(
			_Utils_ap(selectionsA, selectionsB));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$join = F2(
	function (a, b) {
		var _n0 = _Utils_Tuple2(a, b);
		if (_n0.a.$ === 'SpecifiedType') {
			if (_n0.b.$ === 'SpecifiedType') {
				var typeInfoA = _n0.a.a;
				var typeInfoB = _n0.b.a;
				return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
					_Utils_update(
						typeInfoA,
						{
							coreType: A2(typeInfoA.join, typeInfoA.coreType, typeInfoB.coreType),
							selectionSet: A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mergeSelectionSets, typeInfoA.selectionSet, typeInfoB.selectionSet)
						}));
			} else {
				var _n2 = _n0.b;
				return a;
			}
		} else {
			var _n1 = _n0.a;
			return b;
		}
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mergeFragments = F2(
	function (fragmentsA, fragmentsB) {
		return _Utils_ap(
			fragmentsA,
			A2(
				elm$core$List$filter,
				function (fragmentItem) {
					return !A2(
						elm$core$List$any,
						elm$core$Basics$eq(fragmentItem),
						fragmentsA);
				},
				fragmentsB));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map2 = F3(
	function (f, _n0, _n1) {
		var sourceTypeA = _n0.a;
		var decoderA = _n0.b;
		var varsA = _n0.c;
		var fragmentsA = _n0.d;
		var sourceTypeB = _n1.a;
		var decoderB = _n1.b;
		var varsB = _n1.c;
		var fragmentsB = _n1.d;
		var mergedVariables = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Util$mergeVariables, varsA, varsB);
		var mergedFragments = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mergeFragments, fragmentsA, fragmentsB);
		var joinedSourceType = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$join, sourceTypeA, sourceTypeB);
		var joinedDecoder = function (selectionSet) {
			return A3(
				elm$json$Json$Decode$map2,
				f,
				decoderA(selectionSet),
				decoderB(selectionSet));
		};
		return A4(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec, joinedSourceType, joinedDecoder, mergedVariables, mergedFragments);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with = F2(
	function (selection, objectSpec) {
		return A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$map2,
			elm$core$Basics$apL,
			objectSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(selection));
	});
var author$project$Api$User$accountObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'globalWorkDayHours', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'accType', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, author$project$Api$uuid),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$User$Account)))));
var author$project$Types$User$User = F5(
	function (id, email, firstName, lastName, account) {
		return {account: account, email: email, firstName: firstName, id: id, lastName: lastName};
	});
var author$project$Api$User$userObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'account', _List_Nil, author$project$Api$User$accountObject),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'lastName', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'firstName', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'email', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, author$project$Api$uuid),
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$User$User))))));
var author$project$Types$User$ProfileRequest = function (profile) {
	return {profile: profile};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Operation = function (a) {
	return {$: 'Operation', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Document = function (a) {
	return {$: 'Document', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$fragmentDefinitionsFromOperation = function (_n0) {
	var spec = _n0.a.spec;
	var _n1 = spec;
	var fragments = _n1.d;
	return fragments;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Directive = function (a) {
	return {$: 'Directive', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$directiveAST = function (_n0) {
	var name = _n0.a;
	var _arguments = _n0.b;
	return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Directive(
		{
			_arguments: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$argumentsAST(_arguments),
			name: name
		});
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Mutation = {$: 'Mutation'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Query = {$: 'Query'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$operationTypeAST = function (operationType) {
	if (operationType.$ === 'QueryOperationType') {
		return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Query;
	} else {
		return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Mutation;
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSpec = function (_n0) {
	var sourceType = _n0.a;
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(sourceType);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$variableDefinitionsAST = function (_n0) {
	var vars = _n0.c;
	return A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$toDefinitionAST, vars);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$operationAST = function (_n0) {
	var operationType = _n0.a.operationType;
	var name = _n0.a.name;
	var directives = _n0.a.directives;
	var spec = _n0.a.spec;
	return {
		directives: A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$directiveAST, directives),
		name: name,
		operationType: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$operationTypeAST(operationType),
		selectionSet: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSpec(spec),
		variableDefinitions: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$variableDefinitionsAST(spec)
	};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Document = function (a) {
	return {$: 'Document', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$FragmentDefinition = function (a) {
	return {$: 'FragmentDefinition', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$OperationDefinition = function (a) {
	return {$: 'OperationDefinition', a: a};
};
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$String$fromFloat = _String_fromNumber;
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeKeyValuePair = function (_n1) {
	var key = _n1.a;
	var value = _n1.b;
	return key + (': ' + jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeValue(value));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeValue = function (value) {
	switch (value.$) {
		case 'VariableValue':
			var name = value.b;
			return '$' + name;
		case 'IntValue':
			var _int = value.a;
			return elm$core$String$fromInt(_int);
		case 'FloatValue':
			var _float = value.a;
			return elm$core$String$fromFloat(_float);
		case 'StringValue':
			var string = value.a;
			return A2(
				elm$json$Json$Encode$encode,
				0,
				elm$json$Json$Encode$string(string));
		case 'BooleanValue':
			if (value.a) {
				return 'true';
			} else {
				return 'false';
			}
		case 'NullValue':
			return 'null';
		case 'EnumValue':
			var symbol = value.a;
			return symbol;
		case 'ListValue':
			var values = value.a;
			return '[' + (A2(
				elm$core$String$join,
				', ',
				A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeValue, values)) + ']');
		default:
			var pairs = value.a;
			return '{' + (A2(
				elm$core$String$join,
				', ',
				A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeKeyValuePair, pairs)) + '}');
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeArgList = function (args) {
	return elm$core$List$isEmpty(args) ? _List_Nil : _List_fromArray(
		[
			'(' + (A2(
			elm$core$String$join,
			', ',
			A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeKeyValuePair, args)) + ')')
		]);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirectiveName = function (name) {
	return '@' + name;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective = function (_n0) {
	var name = _n0.a.name;
	var _arguments = _n0.a._arguments;
	return A2(
		elm$core$String$join,
		'',
		A2(
			elm$core$List$cons,
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirectiveName(name),
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeArgList(_arguments)));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent = F2(
	function (level, string) {
		return (level <= 0) ? string : ('  ' + A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent, level - 1, string));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe = function (m) {
	if (m.$ === 'Nothing') {
		return _List_Nil;
	} else {
		var x = m.a;
		return _List_fromArray(
			[x]);
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFieldAlias = function (alias) {
	return alias + ':';
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentSpreadName = function (name) {
	return '...' + name;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentSpread = F2(
	function (indentLevel, _n0) {
		var name = _n0.name;
		var directives = _n0.directives;
		return A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent,
			indentLevel,
			A2(
				elm$core$String$join,
				' ',
				A2(
					elm$core$List$cons,
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentSpreadName(name),
					A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, directives))));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeCondition = function (_n0) {
	var namedType = _n0.a;
	return 'on ' + namedType;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeField = F2(
	function (indentLevel, field) {
		return A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent,
			indentLevel,
			A2(
				elm$core$String$join,
				' ',
				elm$core$List$concat(
					_List_fromArray(
						[
							jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe(
							A2(elm$core$Maybe$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFieldAlias, field.alias)),
							_List_fromArray(
							[
								A2(
								elm$core$String$join,
								'',
								A2(
									elm$core$List$cons,
									field.name,
									jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeArgList(field._arguments)))
							]),
							A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, field.directives),
							A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, indentLevel, field.selectionSet)
						]))));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeInlineFragment = F2(
	function (indentLevel, _n2) {
		var typeCondition = _n2.typeCondition;
		var directives = _n2.directives;
		var selectionSet = _n2.selectionSet;
		return A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent,
			indentLevel,
			A2(
				elm$core$String$join,
				' ',
				elm$core$List$concat(
					_List_fromArray(
						[
							A2(
							elm$core$List$cons,
							'...',
							jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe(
								A2(elm$core$Maybe$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeCondition, typeCondition))),
							A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, directives),
							A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, indentLevel, selectionSet)
						]))));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelection = F2(
	function (indentLevel, selection) {
		switch (selection.$) {
			case 'Field':
				var field = selection.a;
				return A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeField, indentLevel, field);
			case 'FragmentSpread':
				var fragmentSpread = selection.a;
				return A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentSpread, indentLevel, fragmentSpread);
			default:
				var inlineFragment = selection.a;
				return A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeInlineFragment, indentLevel, inlineFragment);
		}
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet = F2(
	function (indentLevel, _n0) {
		var selections = _n0.a;
		return elm$core$List$isEmpty(selections) ? _List_Nil : _List_fromArray(
			[
				'{\n' + (A2(
				elm$core$String$join,
				'\n',
				A2(
					elm$core$List$map,
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelection(indentLevel + 1),
					selections)) + ('\n' + A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$indent, indentLevel, '}')))
			]);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentDefinition = function (_n0) {
	var name = _n0.name;
	var typeCondition = _n0.typeCondition;
	var directives = _n0.directives;
	var selectionSet = _n0.selectionSet;
	return A2(
		elm$core$String$join,
		' ',
		elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						'fragment',
						name,
						jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeCondition(typeCondition)
					]),
					A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, directives),
					A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, 0, selectionSet)
				])));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeOperationType = function (opType) {
	if (opType.$ === 'Query') {
		return 'query';
	} else {
		return 'mutation';
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefaultValue = function (value) {
	return '= ' + jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeValue(value);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeNullability = function (nullability) {
	if (nullability.$ === 'Nullable') {
		return '';
	} else {
		return '!';
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeCoreTypeRef = function (coreTypeRef) {
	if (coreTypeRef.$ === 'NamedTypeRef') {
		var name = coreTypeRef.a;
		return name;
	} else {
		var typeRef = coreTypeRef.a;
		return '[' + (jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeRef(typeRef) + ']');
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeRef = function (_n0) {
	var nullability = _n0.a;
	var coreTypeRef = _n0.b;
	return _Utils_ap(
		jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeCoreTypeRef(coreTypeRef),
		jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeNullability(nullability));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableName = function (name) {
	return '$' + name;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableDefinition = function (_n0) {
	var info = _n0.a;
	return A2(
		elm$core$String$join,
		' ',
		elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableName(info.name) + ':',
						jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeTypeRef(info.variableType)
					]),
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe(
					A2(elm$core$Maybe$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefaultValue, info.defaultValue))
				])));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableDefinitions = function (defs) {
	return elm$core$List$isEmpty(defs) ? _List_Nil : _List_fromArray(
		[
			'(' + (A2(
			elm$core$String$join,
			', ',
			A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableDefinition, defs)) + ')')
		]);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeOperation = function (info) {
	return A2(
		elm$core$String$join,
		' ',
		elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeOperationType(info.operationType)
					]),
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$listFromMaybe(info.name),
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeVariableDefinitions(info.variableDefinitions),
					A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDirective, info.directives),
					A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, 0, info.selectionSet)
				])));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefinition = function (definition) {
	switch (definition.$) {
		case 'OperationDefinition':
			var operationInfo = definition.a;
			return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeOperation(operationInfo);
		case 'QueryShorthand':
			var selectionSet = definition.a;
			return A2(
				elm$core$String$join,
				'',
				A2(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeSelectionSet, 0, selectionSet));
		default:
			var fragmentInfo = definition.a;
			return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeFragmentDefinition(fragmentInfo);
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDocument = function (_n0) {
	var definitions = _n0.a;
	return A2(
		elm$core$String$join,
		'\n\n',
		A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDefinition, definitions));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$document = function (operation) {
	var fragmentDefinitions = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$fragmentDefinitionsFromOperation(operation);
	var ast = jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Document(
		_Utils_ap(
			A2(elm$core$List$map, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$FragmentDefinition, fragmentDefinitions),
			_List_fromArray(
				[
					jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$OperationDefinition(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$operationAST(operation))
				])));
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Document(
		{
			ast: ast,
			operation: operation,
			serialized: jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$Serialize$serializeDocument(ast)
		});
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$QueryOperationType = {$: 'QueryOperationType'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryOperationType = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$QueryOperationType;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument = function (spec) {
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$document(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Operation(
			{directives: _List_Nil, name: elm$core$Maybe$Nothing, operationType: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryOperationType, spec: spec}));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Request = function (a) {
	return {$: 'Request', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$specDecoder = function (_n0) {
	var sourceType = _n0.a;
	var decoderFromSelectionSet = _n0.b;
	return decoderFromSelectionSet(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(sourceType));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentResponseDecoder = function (_n0) {
	var operation = _n0.a.operation;
	var _n1 = operation;
	var spec = _n1.a.spec;
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$specDecoder(spec);
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentVariables = function (_n0) {
	var operation = _n0.a.operation;
	var _n1 = operation;
	var spec = _n1.a.spec;
	var _n2 = spec;
	var vars = _n2.c;
	return vars;
};
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$name = function (_var) {
	if (_var.$ === 'RequiredVariable') {
		var variableName = _var.a;
		return variableName;
	} else {
		var variableName = _var.a;
		return variableName;
	}
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$valueFromSource = F2(
	function (source, _var) {
		if (_var.$ === 'RequiredVariable') {
			var f = _var.c;
			return elm$core$Maybe$Just(
				_Utils_Tuple2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$name(_var),
					f(source)));
		} else {
			var f = _var.c;
			var _n1 = f(source);
			if (_n1.$ === 'Nothing') {
				return elm$core$Maybe$Nothing;
			} else {
				var value = _n1.a;
				return elm$core$Maybe$Just(
					_Utils_Tuple2(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$name(_var),
						value));
			}
		}
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$extractValuesFrom = F2(
	function (source, vars) {
		return A2(
			elm$core$List$filterMap,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$valueFromSource(source),
			vars);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request = F2(
	function (vars, doc) {
		var operation = doc.a.operation;
		var ast = doc.a.ast;
		var serialized = doc.a.serialized;
		return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Request(
			{
				documentAST: ast,
				documentString: serialized,
				responseDataDecoder: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentResponseDecoder(doc),
				variableValues: A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$extractValuesFrom,
					vars,
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$documentVariables(doc))
			});
	});
var author$project$Api$User$profileQuery = function () {
	var queryRoot = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'profile', _List_Nil, author$project$Api$User$userObject),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$User$ProfileRequest));
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
		_Utils_Tuple0,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot));
}();
var author$project$Page$Profile$ReceiveProfileResponse = function (a) {
	return {$: 'ReceiveProfileResponse', a: a};
};
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(
					elm$core$Task$onError,
					A2(
						elm$core$Basics$composeL,
						A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
						elm$core$Result$Err),
					A2(
						elm$core$Task$andThen,
						A2(
							elm$core$Basics$composeL,
							A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
							elm$core$Result$Ok),
						task))));
	});
var author$project$Page$Profile$sendProfileQuery = function (csrf) {
	return A2(
		elm$core$Task$attempt,
		author$project$Page$Profile$ReceiveProfileResponse,
		A2(author$project$Api$sendQueryRequest, csrf, author$project$Api$User$profileQuery));
};
var author$project$Route$NotFoundR = {$: 'NotFoundR'};
var author$project$Route$AddProjectR = {$: 'AddProjectR'};
var author$project$Route$AddTimelogR = {$: 'AddTimelogR'};
var author$project$Route$EditProjectR = function (a) {
	return {$: 'EditProjectR', a: a};
};
var author$project$Route$EditTimelogR = function (a) {
	return {$: 'EditTimelogR', a: a};
};
var author$project$Route$ProfileR = {$: 'ProfileR'};
var author$project$Route$ProjectsR = {$: 'ProjectsR'};
var author$project$Route$TimelogsR = {$: 'TimelogsR'};
var author$project$Route$UsersR = {$: 'UsersR'};
var elm$url$Url$Parser$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {frag: frag, params: params, unvisited: unvisited, value: value, visited: visited};
	});
var elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return elm$url$Url$Parser$Parser(
			function (_n0) {
				var visited = _n0.visited;
				var unvisited = _n0.unvisited;
				var params = _n0.params;
				var frag = _n0.frag;
				var value = _n0.value;
				if (!unvisited.b) {
					return _List_Nil;
				} else {
					var next = unvisited.a;
					var rest = unvisited.b;
					var _n2 = stringToSomething(next);
					if (_n2.$ === 'Just') {
						var nextValue = _n2.a;
						return _List_fromArray(
							[
								A5(
								elm$url$Url$Parser$State,
								A2(elm$core$List$cons, next, visited),
								rest,
								params,
								frag,
								value(nextValue))
							]);
					} else {
						return _List_Nil;
					}
				}
			});
	});
var author$project$Route$uuid = A2(elm$url$Url$Parser$custom, 'UUID', danyx23$elm_uuid$Uuid$fromString);
var elm$url$Url$Parser$mapState = F2(
	function (func, _n0) {
		var visited = _n0.visited;
		var unvisited = _n0.unvisited;
		var params = _n0.params;
		var frag = _n0.frag;
		var value = _n0.value;
		return A5(
			elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var elm$url$Url$Parser$map = F2(
	function (subValue, _n0) {
		var parseArg = _n0.a;
		return elm$url$Url$Parser$Parser(
			function (_n1) {
				var visited = _n1.visited;
				var unvisited = _n1.unvisited;
				var params = _n1.params;
				var frag = _n1.frag;
				var value = _n1.value;
				return A2(
					elm$core$List$map,
					elm$url$Url$Parser$mapState(value),
					parseArg(
						A5(elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
			});
	});
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var elm$url$Url$Parser$oneOf = function (parsers) {
	return elm$url$Url$Parser$Parser(
		function (state) {
			return A2(
				elm$core$List$concatMap,
				function (_n0) {
					var parser = _n0.a;
					return parser(state);
				},
				parsers);
		});
};
var elm$url$Url$Parser$s = function (str) {
	return elm$url$Url$Parser$Parser(
		function (_n0) {
			var visited = _n0.visited;
			var unvisited = _n0.unvisited;
			var params = _n0.params;
			var frag = _n0.frag;
			var value = _n0.value;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				return _Utils_eq(next, str) ? _List_fromArray(
					[
						A5(
						elm$url$Url$Parser$State,
						A2(elm$core$List$cons, next, visited),
						rest,
						params,
						frag,
						value)
					]) : _List_Nil;
			}
		});
};
var elm$url$Url$Parser$slash = F2(
	function (_n0, _n1) {
		var parseBefore = _n0.a;
		var parseAfter = _n1.a;
		return elm$url$Url$Parser$Parser(
			function (state) {
				return A2(
					elm$core$List$concatMap,
					parseAfter,
					parseBefore(state));
			});
	});
var elm$url$Url$Parser$top = elm$url$Url$Parser$Parser(
	function (state) {
		return _List_fromArray(
			[state]);
	});
var author$project$Route$routeParser = elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2(elm$url$Url$Parser$map, author$project$Route$TimelogsR, elm$url$Url$Parser$top),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$AddTimelogR,
			A2(
				elm$url$Url$Parser$slash,
				elm$url$Url$Parser$s('times'),
				elm$url$Url$Parser$s('add'))),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$EditTimelogR,
			A2(
				elm$url$Url$Parser$slash,
				elm$url$Url$Parser$s('times'),
				A2(
					elm$url$Url$Parser$slash,
					elm$url$Url$Parser$s('edit'),
					author$project$Route$uuid))),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$ProjectsR,
			elm$url$Url$Parser$s('projects')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$AddProjectR,
			A2(
				elm$url$Url$Parser$slash,
				elm$url$Url$Parser$s('projects'),
				elm$url$Url$Parser$s('add'))),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$EditProjectR,
			A2(
				elm$url$Url$Parser$slash,
				elm$url$Url$Parser$s('projects'),
				A2(
					elm$url$Url$Parser$slash,
					elm$url$Url$Parser$s('edit'),
					author$project$Route$uuid))),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$UsersR,
			elm$url$Url$Parser$s('users')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$ProfileR,
			elm$url$Url$Parser$s('profile')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$NotFoundR,
			elm$url$Url$Parser$s('404'))
		]));
var elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _n1 = state.unvisited;
			if (!_n1.b) {
				return elm$core$Maybe$Just(state.value);
			} else {
				if ((_n1.a === '') && (!_n1.b.b)) {
					return elm$core$Maybe$Just(state.value);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				elm$core$List$cons,
				segment,
				elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var elm$url$Url$Parser$preparePath = function (path) {
	var _n0 = A2(elm$core$String$split, '/', path);
	if (_n0.b && (_n0.a === '')) {
		var segments = _n0.b;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _n0;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var elm$url$Url$percentDecode = _Url_percentDecode;
var elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 'Nothing') {
			return elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return elm$core$Maybe$Just(
				A2(elm$core$List$cons, value, list));
		}
	});
var elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _n0 = A2(elm$core$String$split, '=', segment);
		if ((_n0.b && _n0.b.b) && (!_n0.b.b.b)) {
			var rawKey = _n0.a;
			var _n1 = _n0.b;
			var rawValue = _n1.a;
			var _n2 = elm$url$Url$percentDecode(rawKey);
			if (_n2.$ === 'Nothing') {
				return dict;
			} else {
				var key = _n2.a;
				var _n3 = elm$url$Url$percentDecode(rawValue);
				if (_n3.$ === 'Nothing') {
					return dict;
				} else {
					var value = _n3.a;
					return A3(
						elm$core$Dict$update,
						key,
						elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 'Nothing') {
		return elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			elm$core$List$foldr,
			elm$url$Url$Parser$addParam,
			elm$core$Dict$empty,
			A2(elm$core$String$split, '&', qry));
	}
};
var elm$url$Url$Parser$parse = F2(
	function (_n0, url) {
		var parser = _n0.a;
		return elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					elm$url$Url$Parser$State,
					_List_Nil,
					elm$url$Url$Parser$preparePath(url.path),
					elm$url$Url$Parser$prepareQuery(url.query),
					url.fragment,
					elm$core$Basics$identity)));
	});
var author$project$Route$fromUrl = function (url) {
	var _n0 = A2(elm$url$Url$Parser$parse, author$project$Route$routeParser, url);
	if (_n0.$ === 'Just') {
		var answer = _n0.a;
		return answer;
	} else {
		return author$project$Route$NotFoundR;
	}
};
var author$project$Page$Profile$init = F3(
	function (flags, url, key) {
		var route = author$project$Route$fromUrl(url);
		return _Utils_Tuple2(
			{errResult: elm$core$Maybe$Nothing, isPending: false, readyUser: false, user: elm$core$Maybe$Nothing},
			author$project$Page$Profile$sendProfileQuery(flags.csrftoken));
	});
var author$project$Types$Project$Project = F6(
	function (id, name, colour, company, abbreviation, workDayHours) {
		return {abbreviation: abbreviation, colour: colour, company: company, id: id, name: name, workDayHours: workDayHours};
	});
var author$project$Api$Project$projectsObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'workDayHours', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'abbreviation', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'company', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'colour', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
					A2(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
						A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, author$project$Api$uuid),
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$Project$Project)))))));
var author$project$Types$Project$ProjectsRequest = function (allProjects) {
	return {allProjects: allProjects};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ListType = function (a) {
	return {$: 'ListType', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$listJoin = F2(
	function (_n0, _n1) {
		var itemSourceTypeA = _n0.a;
		var itemSourceTypeB = _n1.a;
		return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ListType(
			A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$join, itemSourceTypeA, itemSourceTypeB));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list = function (_n0) {
	var itemType = _n0.a;
	var decoder = _n0.b;
	var vars = _n0.c;
	var fragments = _n0.d;
	return A4(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ValueSpec,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$SpecifiedType(
			{
				coreType: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$ListType(itemType),
				join: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$listJoin,
				nullability: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$nonNullFlag,
				selectionSet: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$selectionSetFromSourceType(itemType)
			}),
		A2(elm$core$Basics$composeL, elm$json$Json$Decode$list, decoder),
		vars,
		fragments);
};
var author$project$Api$Project$projectsQuery = function () {
	var queryRoot = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'allProjects',
			_List_Nil,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$Api$Project$projectsObject)),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$Project$ProjectsRequest));
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
		_Utils_Tuple0,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot));
}();
var author$project$Page$Projects$ReceiveProjectsResponse = function (a) {
	return {$: 'ReceiveProjectsResponse', a: a};
};
var author$project$Page$Projects$sendProjectsQuery = function (csrf) {
	return A2(
		elm$core$Task$attempt,
		author$project$Page$Projects$ReceiveProjectsResponse,
		A2(author$project$Api$sendQueryRequest, csrf, author$project$Api$Project$projectsQuery));
};
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Page$Projects$init = F3(
	function (flags, url, key) {
		var route = author$project$Route$fromUrl(url);
		return _Utils_Tuple2(
			{errResult: elm$core$Maybe$Nothing, isPending: false, projects: elm$core$Array$empty, readyProjects: false},
			function () {
				if (route.$ === 'ProjectsR') {
					return author$project$Page$Projects$sendProjectsQuery(flags.csrftoken);
				} else {
					return elm$core$Platform$Cmd$none;
				}
			}());
	});
var author$project$Types$Project$AddProjectRequest = function (allUsers) {
	return {allUsers: allUsers};
};
var author$project$Api$Project$addProjectQuery = function () {
	var queryRoot = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'allUsers',
			_List_Nil,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$Api$User$userObject)),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$Project$AddProjectRequest));
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
		_Utils_Tuple0,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot));
}();
var author$project$Page$Projects$AddProject$ReceiveAddProjectResponse = function (a) {
	return {$: 'ReceiveAddProjectResponse', a: a};
};
var author$project$Page$Projects$AddProject$sendAddProjectQuery = function (csrf) {
	return A2(
		elm$core$Task$attempt,
		author$project$Page$Projects$AddProject$ReceiveAddProjectResponse,
		A2(author$project$Api$sendQueryRequest, csrf, author$project$Api$Project$addProjectQuery));
};
var author$project$Page$Projects$AddProject$init = F3(
	function (flags, url, key) {
		var route = author$project$Route$fromUrl(url);
		return _Utils_Tuple2(
			{addMembers: _List_Nil, createForm: elm$core$Maybe$Nothing, errResult: elm$core$Maybe$Nothing, isPending: false},
			function () {
				if (route.$ === 'AddProjectR') {
					return author$project$Page$Projects$AddProject$sendAddProjectQuery(flags.csrftoken);
				} else {
					return elm$core$Platform$Cmd$none;
				}
			}());
	});
var danyx23$elm_uuid$Uuid$toString = function (_n0) {
	var internalString = _n0.a;
	return internalString;
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NamedTypeRef = function (a) {
	return {$: 'NamedTypeRef', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NonNull = {$: 'NonNull'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeRef = F2(
	function (a, b) {
		return {$: 'TypeRef', a: a, b: b};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$namedType = A2(
	elm$core$Basics$composeL,
	jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeRef(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NonNull),
	jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NamedTypeRef);
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull = {$: 'NonNull'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec = F3(
	function (a, b, c) {
		return {$: 'VariableSpec', a: a, b: b, c: c};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$EnumValue = function (a) {
	return {$: 'EnumValue', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$enum = F2(
	function (typeName, convert) {
		return A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$namedType(typeName),
			A2(elm$core$Basics$composeR, convert, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$EnumValue));
	});
var author$project$Api$uuidVar = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$enum,
	'UUID',
	function (x) {
		return danyx23$elm_uuid$Uuid$toString(x);
	});
var author$project$Types$Project$ProjectWithMembers = F7(
	function (id, name, colour, company, abbreviation, workDayHours, members) {
		return {abbreviation: abbreviation, colour: colour, company: company, id: id, members: members, name: name, workDayHours: workDayHours};
	});
var author$project$Api$Project$projectWithMembersObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
		'members',
		_List_Nil,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$Api$User$userObject)),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'workDayHours', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$int),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'abbreviation', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'company', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'colour', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
					A2(
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
						A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'name', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
						A2(
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
							A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, author$project$Api$uuid),
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$Project$ProjectWithMembers))))))));
var author$project$Types$Project$EditProjectRequest = F2(
	function (project, allUsers) {
		return {allUsers: allUsers, project: project};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$Value = F2(
	function (a, b) {
		return {$: 'Value', a: a, b: b};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableValue = F2(
	function (a, b) {
		return {$: 'VariableValue', a: a, b: b};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable = function (_var) {
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$Value,
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$VariableValue,
			_Utils_Tuple0,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$name(_var)),
		_List_fromArray(
			[_var]));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$RequiredVariable = F3(
	function (a, b, c) {
		return {$: 'RequiredVariable', a: a, b: b, c: c};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required = F3(
	function (variableName, extract, _n0) {
		var typeRef = _n0.b;
		var convert = _n0.c;
		return A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$RequiredVariable,
			variableName,
			typeRef,
			A2(elm$core$Basics$composeR, extract, convert));
	});
var author$project$Api$Project$editProjectQuery = function (uuid) {
	var projectIDVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'projectId',
		function ($) {
			return $.projectId;
		},
		author$project$Api$uuidVar);
	var queryRoot = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'allUsers',
			_List_Nil,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$Api$User$userObject)),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'project',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'id',
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(projectIDVar))
					]),
				author$project$Api$Project$projectWithMembersObject),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$Project$EditProjectRequest)));
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
		{projectId: uuid},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot));
};
var author$project$Page$Projects$EditProject$ReceiveEditProjectResponse = function (a) {
	return {$: 'ReceiveEditProjectResponse', a: a};
};
var author$project$Page$Projects$EditProject$sendEditProjectQuery = F2(
	function (csrf, uuid) {
		return A2(
			elm$core$Task$attempt,
			author$project$Page$Projects$EditProject$ReceiveEditProjectResponse,
			A2(
				author$project$Api$sendQueryRequest,
				csrf,
				author$project$Api$Project$editProjectQuery(uuid)));
	});
var author$project$Page$Projects$EditProject$init = F3(
	function (flags, url, key) {
		var route = author$project$Route$fromUrl(url);
		return _Utils_Tuple2(
			{addMembers: _List_Nil, errResult: elm$core$Maybe$Nothing, isPending: false, removeMembers: _List_Nil, showModal: false, updateForm: elm$core$Maybe$Nothing},
			function () {
				if (route.$ === 'EditProjectR') {
					var uuid = route.a;
					return A2(author$project$Page$Projects$EditProject$sendEditProjectQuery, flags.csrftoken, uuid);
				} else {
					return elm$core$Platform$Cmd$none;
				}
			}());
	});
var author$project$Utils$TimeDelta$TimeDelta = F4(
	function (days, hours, minutes, seconds) {
		return {days: days, hours: hours, minutes: minutes, seconds: seconds};
	});
var author$project$DonutChart$init = {
	displayTotal: A4(author$project$Utils$TimeDelta$TimeDelta, 0, 0, 0, 0),
	innerRadius: 95,
	outerRadius: 70,
	points: _List_Nil,
	selected: elm$core$Maybe$Nothing
};
var author$project$Page$Timelogs$ReceiveDate = function (a) {
	return {$: 'ReceiveDate', a: a};
};
var author$project$Types$Timelog$WeekView = {$: 'WeekView'};
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var elm$time$Time$millisToPosix = elm$time$Time$Posix;
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var elm$time$Time$utc = A2(elm$time$Time$Zone, 0, _List_Nil);
var elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return elm$core$Basics$floor(numerator / denominator);
	});
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0.a;
	return millis;
};
var elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var elm$time$Time$toAdjustedMinutes = F2(
	function (_n0, time) {
		var defaultOffset = _n0.a;
		var eras = _n0.b;
		return A3(
			elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				elm$time$Time$flooredDiv,
				elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2(elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		day: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		month: month,
		year: year + ((month <= 2) ? 1 : 0)
	};
};
var elm$time$Time$toDay = F2(
	function (zone, time) {
		return elm$time$Time$toCivil(
			A2(elm$time$Time$toAdjustedMinutes, zone, time)).day;
	});
var elm$time$Time$Apr = {$: 'Apr'};
var elm$time$Time$Aug = {$: 'Aug'};
var elm$time$Time$Dec = {$: 'Dec'};
var elm$time$Time$Feb = {$: 'Feb'};
var elm$time$Time$Jan = {$: 'Jan'};
var elm$time$Time$Jul = {$: 'Jul'};
var elm$time$Time$Jun = {$: 'Jun'};
var elm$time$Time$Mar = {$: 'Mar'};
var elm$time$Time$May = {$: 'May'};
var elm$time$Time$Nov = {$: 'Nov'};
var elm$time$Time$Oct = {$: 'Oct'};
var elm$time$Time$Sep = {$: 'Sep'};
var elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _n0 = elm$time$Time$toCivil(
			A2(elm$time$Time$toAdjustedMinutes, zone, time)).month;
		switch (_n0) {
			case 1:
				return elm$time$Time$Jan;
			case 2:
				return elm$time$Time$Feb;
			case 3:
				return elm$time$Time$Mar;
			case 4:
				return elm$time$Time$Apr;
			case 5:
				return elm$time$Time$May;
			case 6:
				return elm$time$Time$Jun;
			case 7:
				return elm$time$Time$Jul;
			case 8:
				return elm$time$Time$Aug;
			case 9:
				return elm$time$Time$Sep;
			case 10:
				return elm$time$Time$Oct;
			case 11:
				return elm$time$Time$Nov;
			default:
				return elm$time$Time$Dec;
		}
	});
var elm$time$Time$toYear = F2(
	function (zone, time) {
		return elm$time$Time$toCivil(
			A2(elm$time$Time$toAdjustedMinutes, zone, time)).year;
	});
var elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var justinmimbs$date$Date$RD = function (a) {
	return {$: 'RD', a: a};
};
var elm$core$Basics$modBy = _Basics_modBy;
var elm$core$Basics$neq = _Utils_notEqual;
var justinmimbs$date$Date$isLeapYear = function (y) {
	return ((!A2(elm$core$Basics$modBy, 4, y)) && A2(elm$core$Basics$modBy, 100, y)) || (!A2(elm$core$Basics$modBy, 400, y));
};
var justinmimbs$date$Date$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = justinmimbs$date$Date$isLeapYear(y) ? 1 : 0;
		switch (m.$) {
			case 'Jan':
				return 0;
			case 'Feb':
				return 31;
			case 'Mar':
				return 59 + leapDays;
			case 'Apr':
				return 90 + leapDays;
			case 'May':
				return 120 + leapDays;
			case 'Jun':
				return 151 + leapDays;
			case 'Jul':
				return 181 + leapDays;
			case 'Aug':
				return 212 + leapDays;
			case 'Sep':
				return 243 + leapDays;
			case 'Oct':
				return 273 + leapDays;
			case 'Nov':
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var justinmimbs$date$Date$floorDiv = F2(
	function (a, b) {
		return elm$core$Basics$floor(a / b);
	});
var justinmimbs$date$Date$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (A2(justinmimbs$date$Date$floorDiv, y, 4) - A2(justinmimbs$date$Date$floorDiv, y, 100)) + A2(justinmimbs$date$Date$floorDiv, y, 400);
	return (365 * y) + leapYears;
};
var justinmimbs$date$Date$daysInMonth = F2(
	function (y, m) {
		switch (m.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return justinmimbs$date$Date$isLeapYear(y) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var justinmimbs$date$Date$fromCalendarDate = F3(
	function (y, m, d) {
		return justinmimbs$date$Date$RD(
			(justinmimbs$date$Date$daysBeforeYear(y) + A2(justinmimbs$date$Date$daysBeforeMonth, y, m)) + A3(
				elm$core$Basics$clamp,
				1,
				A2(justinmimbs$date$Date$daysInMonth, y, m),
				d));
	});
var justinmimbs$date$Date$fromPosix = F2(
	function (zone, posix) {
		return A3(
			justinmimbs$date$Date$fromCalendarDate,
			A2(elm$time$Time$toYear, zone, posix),
			A2(elm$time$Time$toMonth, zone, posix),
			A2(elm$time$Time$toDay, zone, posix));
	});
var elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var elm$time$Time$customZone = elm$time$Time$Zone;
var elm$time$Time$here = _Time_here(_Utils_Tuple0);
var elm$time$Time$now = _Time_now(elm$time$Time$millisToPosix);
var justinmimbs$date$Date$today = A3(elm$core$Task$map2, justinmimbs$date$Date$fromPosix, elm$time$Time$here, elm$time$Time$now);
var author$project$Page$Timelogs$init = F3(
	function (flags, url, key) {
		var route = author$project$Route$fromUrl(url);
		return _Utils_Tuple2(
			{
				donutChartData: author$project$DonutChart$init,
				errResult: elm$core$Maybe$Nothing,
				filterDate: A2(
					justinmimbs$date$Date$fromPosix,
					elm$time$Time$utc,
					elm$time$Time$millisToPosix(0)),
				filterView: author$project$Types$Timelog$WeekView,
				isPending: false,
				readyTimes: false,
				timelogs: elm$core$Array$empty
			},
			function () {
				if (route.$ === 'TimelogsR') {
					return A2(elm$core$Task$perform, author$project$Page$Timelogs$ReceiveDate, justinmimbs$date$Date$today);
				} else {
					return elm$core$Platform$Cmd$none;
				}
			}());
	});
var author$project$Page$Timelogs$AddTimelog$init = F3(
	function (flags, url, key) {
		return _Utils_Tuple2(
			{createForm: elm$core$Maybe$Nothing, errResult: elm$core$Maybe$Nothing, isPending: false},
			elm$core$Platform$Cmd$none);
	});
var author$project$Api$DateType = {$: 'DateType'};
var elm_community$json_extra$Json$Decode$Extra$fromResult = function (result) {
	if (result.$ === 'Ok') {
		var successValue = result.a;
		return elm$json$Json$Decode$succeed(successValue);
	} else {
		var errorMessage = result.a;
		return elm$json$Json$Decode$fail(errorMessage);
	}
};
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _n0) {
		var parseA = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parseA(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					var _n2 = callback(a);
					var parseB = _n2.a;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var elm$parser$Parser$andThen = elm$parser$Parser$Advanced$andThen;
var elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					elm$parser$Parser$Advanced$Bad,
					false,
					A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var elm$parser$Parser$chompIf = function (isGood) {
	return A2(elm$parser$Parser$Advanced$chompIf, isGood, elm$parser$Parser$UnexpectedChar);
};
var elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var elm$core$String$length = _String_length;
var elm$parser$Parser$Advanced$end = function (x) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				elm$core$String$length(s.src),
				s.offset) ? A3(elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var elm$parser$Parser$end = elm$parser$Parser$Advanced$end(elm$parser$Parser$ExpectingEnd);
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0.a;
		var parseB = _n1.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n2 = parseA(s0);
				if (_n2.$ === 'Bad') {
					var p = _n2.a;
					var x = _n2.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n2.a;
					var a = _n2.b;
					var s1 = _n2.c;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(
							elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$always, keepParser, ignoreParser);
	});
var elm$parser$Parser$ignorer = elm$parser$Parser$Advanced$ignorer;
var elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$apL, parseFunc, parseArg);
	});
var elm$parser$Parser$keeper = elm$parser$Parser$Advanced$keeper;
var elm$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var elm$parser$Parser$map = elm$parser$Parser$Advanced$map;
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var step = _n1;
					return step;
				} else {
					var step = _n1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2(elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var elm$parser$Parser$Advanced$run = F2(
	function (_n0, src) {
		var parse = _n0.a;
		var _n1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_n1.$ === 'Good') {
			var value = _n1.b;
			return elm$core$Result$Ok(value);
		} else {
			var bag = _n1.b;
			return elm$core$Result$Err(
				A2(elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var elm$parser$Parser$run = F2(
	function (parser, source) {
		var _n0 = A2(elm$parser$Parser$Advanced$run, parser, source);
		if (_n0.$ === 'Ok') {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm$core$Result$Err(
				A2(elm$core$List$map, elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var elm$parser$Parser$Advanced$succeed = function (a) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var justinmimbs$date$Date$deadEndToString = function (_n0) {
	var problem = _n0.problem;
	if (problem.$ === 'Problem') {
		var message = problem.a;
		return message;
	} else {
		return 'Expected a date in ISO 8601 format';
	}
};
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var elm$parser$Parser$Advanced$backtrackable = function (_n0) {
	var parse = _n0.a;
	return elm$parser$Parser$Advanced$Parser(
		function (s0) {
			var _n1 = parse(s0);
			if (_n1.$ === 'Bad') {
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, false, x);
			} else {
				var a = _n1.b;
				var s1 = _n1.c;
				return A3(elm$parser$Parser$Advanced$Good, false, a, s1);
			}
		});
};
var elm$parser$Parser$backtrackable = elm$parser$Parser$Advanced$backtrackable;
var elm$parser$Parser$Advanced$commit = function (a) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm$parser$Parser$Advanced$Good, true, a, s);
		});
};
var elm$parser$Parser$commit = elm$parser$Parser$Advanced$commit;
var elm$parser$Parser$Expecting = function (a) {
	return {$: 'Expecting', a: a};
};
var elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var elm$parser$Parser$toToken = function (str) {
	return A2(
		elm$parser$Parser$Advanced$Token,
		str,
		elm$parser$Parser$Expecting(str));
};
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(str);
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _n1 = A5(elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _n1.a;
			var newRow = _n1.b;
			var newCol = _n1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var elm$parser$Parser$token = function (str) {
	return elm$parser$Parser$Advanced$token(
		elm$parser$Parser$toToken(str));
};
var justinmimbs$date$Date$MonthAndDay = F2(
	function (a, b) {
		return {$: 'MonthAndDay', a: a, b: b};
	});
var justinmimbs$date$Date$OrdinalDay = function (a) {
	return {$: 'OrdinalDay', a: a};
};
var justinmimbs$date$Date$WeekAndWeekday = F2(
	function (a, b) {
		return {$: 'WeekAndWeekday', a: a, b: b};
	});
var elm$core$String$toInt = _String_toInt;
var elm$core$String$slice = _String_slice;
var elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3(elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var elm$parser$Parser$mapChompedString = elm$parser$Parser$Advanced$mapChompedString;
var justinmimbs$date$Date$int1 = A2(
	elm$parser$Parser$mapChompedString,
	F2(
		function (str, _n0) {
			return A2(
				elm$core$Maybe$withDefault,
				0,
				elm$core$String$toInt(str));
		}),
	elm$parser$Parser$chompIf(elm$core$Char$isDigit));
var justinmimbs$date$Date$int2 = A2(
	elm$parser$Parser$mapChompedString,
	F2(
		function (str, _n0) {
			return A2(
				elm$core$Maybe$withDefault,
				0,
				elm$core$String$toInt(str));
		}),
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(_Utils_Tuple0),
			elm$parser$Parser$chompIf(elm$core$Char$isDigit)),
		elm$parser$Parser$chompIf(elm$core$Char$isDigit)));
var justinmimbs$date$Date$int3 = A2(
	elm$parser$Parser$mapChompedString,
	F2(
		function (str, _n0) {
			return A2(
				elm$core$Maybe$withDefault,
				0,
				elm$core$String$toInt(str));
		}),
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$succeed(_Utils_Tuple0),
				elm$parser$Parser$chompIf(elm$core$Char$isDigit)),
			elm$parser$Parser$chompIf(elm$core$Char$isDigit)),
		elm$parser$Parser$chompIf(elm$core$Char$isDigit)));
var justinmimbs$date$Date$dayOfYear = elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$succeed(elm$core$Basics$identity),
				elm$parser$Parser$token('-')),
			elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						elm$parser$Parser$backtrackable(
						A2(
							elm$parser$Parser$andThen,
							elm$parser$Parser$commit,
							A2(elm$parser$Parser$map, justinmimbs$date$Date$OrdinalDay, justinmimbs$date$Date$int3))),
						A2(
						elm$parser$Parser$keeper,
						A2(
							elm$parser$Parser$keeper,
							elm$parser$Parser$succeed(justinmimbs$date$Date$MonthAndDay),
							justinmimbs$date$Date$int2),
						elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									elm$parser$Parser$keeper,
									A2(
										elm$parser$Parser$ignorer,
										elm$parser$Parser$succeed(elm$core$Basics$identity),
										elm$parser$Parser$token('-')),
									justinmimbs$date$Date$int2),
									elm$parser$Parser$succeed(1)
								]))),
						A2(
						elm$parser$Parser$keeper,
						A2(
							elm$parser$Parser$keeper,
							A2(
								elm$parser$Parser$ignorer,
								elm$parser$Parser$succeed(justinmimbs$date$Date$WeekAndWeekday),
								elm$parser$Parser$token('W')),
							justinmimbs$date$Date$int2),
						elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									elm$parser$Parser$keeper,
									A2(
										elm$parser$Parser$ignorer,
										elm$parser$Parser$succeed(elm$core$Basics$identity),
										elm$parser$Parser$token('-')),
									justinmimbs$date$Date$int1),
									elm$parser$Parser$succeed(1)
								])))
					]))),
			elm$parser$Parser$backtrackable(
			A2(
				elm$parser$Parser$andThen,
				elm$parser$Parser$commit,
				A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$keeper,
						elm$parser$Parser$succeed(justinmimbs$date$Date$MonthAndDay),
						justinmimbs$date$Date$int2),
					elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								justinmimbs$date$Date$int2,
								elm$parser$Parser$succeed(1)
							]))))),
			A2(elm$parser$Parser$map, justinmimbs$date$Date$OrdinalDay, justinmimbs$date$Date$int3),
			A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(justinmimbs$date$Date$WeekAndWeekday),
					elm$parser$Parser$token('W')),
				justinmimbs$date$Date$int2),
			elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						justinmimbs$date$Date$int1,
						elm$parser$Parser$succeed(1)
					]))),
			elm$parser$Parser$succeed(
			justinmimbs$date$Date$OrdinalDay(1))
		]));
var justinmimbs$date$Date$isBetweenInt = F3(
	function (a, b, x) {
		return (_Utils_cmp(a, x) < 1) && (_Utils_cmp(x, b) < 1);
	});
var justinmimbs$date$Date$numberToMonth = function (mn) {
	var _n0 = A2(elm$core$Basics$max, 1, mn);
	switch (_n0) {
		case 1:
			return elm$time$Time$Jan;
		case 2:
			return elm$time$Time$Feb;
		case 3:
			return elm$time$Time$Mar;
		case 4:
			return elm$time$Time$Apr;
		case 5:
			return elm$time$Time$May;
		case 6:
			return elm$time$Time$Jun;
		case 7:
			return elm$time$Time$Jul;
		case 8:
			return elm$time$Time$Aug;
		case 9:
			return elm$time$Time$Sep;
		case 10:
			return elm$time$Time$Oct;
		case 11:
			return elm$time$Time$Nov;
		default:
			return elm$time$Time$Dec;
	}
};
var justinmimbs$date$Date$fromCalendarParts = F3(
	function (y, mn, d) {
		return (A3(justinmimbs$date$Date$isBetweenInt, 1, 12, mn) && A3(
			justinmimbs$date$Date$isBetweenInt,
			1,
			A2(
				justinmimbs$date$Date$daysInMonth,
				y,
				justinmimbs$date$Date$numberToMonth(mn)),
			d)) ? elm$core$Result$Ok(
			justinmimbs$date$Date$RD(
				(justinmimbs$date$Date$daysBeforeYear(y) + A2(
					justinmimbs$date$Date$daysBeforeMonth,
					y,
					justinmimbs$date$Date$numberToMonth(mn))) + d)) : elm$core$Result$Err(
			'Invalid calendar date (' + (elm$core$String$fromInt(y) + (', ' + (elm$core$String$fromInt(mn) + (', ' + (elm$core$String$fromInt(d) + ')'))))));
	});
var justinmimbs$date$Date$fromOrdinalParts = F2(
	function (y, od) {
		return (A3(justinmimbs$date$Date$isBetweenInt, 1, 365, od) || ((od === 366) && justinmimbs$date$Date$isLeapYear(y))) ? elm$core$Result$Ok(
			justinmimbs$date$Date$RD(
				justinmimbs$date$Date$daysBeforeYear(y) + od)) : elm$core$Result$Err(
			'Invalid ordinal date (' + (elm$core$String$fromInt(y) + (', ' + (elm$core$String$fromInt(od) + ')'))));
	});
var justinmimbs$date$Date$weekdayNumber = function (_n0) {
	var rd = _n0.a;
	var _n1 = A2(elm$core$Basics$modBy, 7, rd);
	if (!_n1) {
		return 7;
	} else {
		var n = _n1;
		return n;
	}
};
var justinmimbs$date$Date$daysBeforeWeekYear = function (y) {
	var jan4 = justinmimbs$date$Date$daysBeforeYear(y) + 4;
	return jan4 - justinmimbs$date$Date$weekdayNumber(
		justinmimbs$date$Date$RD(jan4));
};
var justinmimbs$date$Date$firstOfYear = function (y) {
	return justinmimbs$date$Date$RD(
		justinmimbs$date$Date$daysBeforeYear(y) + 1);
};
var justinmimbs$date$Date$is53WeekYear = function (y) {
	var wdnJan1 = justinmimbs$date$Date$weekdayNumber(
		justinmimbs$date$Date$firstOfYear(y));
	return (wdnJan1 === 4) || ((wdnJan1 === 3) && justinmimbs$date$Date$isLeapYear(y));
};
var justinmimbs$date$Date$fromWeekParts = F3(
	function (wy, wn, wdn) {
		return (A3(justinmimbs$date$Date$isBetweenInt, 1, 7, wdn) && (A3(justinmimbs$date$Date$isBetweenInt, 1, 52, wn) || ((wn === 53) && justinmimbs$date$Date$is53WeekYear(wy)))) ? elm$core$Result$Ok(
			justinmimbs$date$Date$RD(
				(justinmimbs$date$Date$daysBeforeWeekYear(wy) + ((wn - 1) * 7)) + wdn)) : elm$core$Result$Err(
			'Invalid week date (' + (elm$core$String$fromInt(wy) + (', ' + (elm$core$String$fromInt(wn) + (', ' + (elm$core$String$fromInt(wdn) + ')'))))));
	});
var justinmimbs$date$Date$fromYearAndDayOfYear = function (_n0) {
	var y = _n0.a;
	var doy = _n0.b;
	switch (doy.$) {
		case 'MonthAndDay':
			var mn = doy.a;
			var d = doy.b;
			return A3(justinmimbs$date$Date$fromCalendarParts, y, mn, d);
		case 'WeekAndWeekday':
			var wn = doy.a;
			var wdn = doy.b;
			return A3(justinmimbs$date$Date$fromWeekParts, y, wn, wdn);
		default:
			var od = doy.a;
			return A2(justinmimbs$date$Date$fromOrdinalParts, y, od);
	}
};
var justinmimbs$date$Date$int4 = A2(
	elm$parser$Parser$mapChompedString,
	F2(
		function (str, _n0) {
			return A2(
				elm$core$Maybe$withDefault,
				0,
				elm$core$String$toInt(str));
		}),
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$ignorer,
					A2(
						elm$parser$Parser$ignorer,
						elm$parser$Parser$succeed(_Utils_Tuple0),
						elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									elm$parser$Parser$chompIf(
									function (c) {
										return _Utils_eq(
											c,
											_Utils_chr('-'));
									}),
									elm$parser$Parser$succeed(_Utils_Tuple0)
								]))),
					elm$parser$Parser$chompIf(elm$core$Char$isDigit)),
				elm$parser$Parser$chompIf(elm$core$Char$isDigit)),
			elm$parser$Parser$chompIf(elm$core$Char$isDigit)),
		elm$parser$Parser$chompIf(elm$core$Char$isDigit)));
var elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var elm$parser$Parser$Advanced$problem = function (x) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var elm$parser$Parser$problem = function (msg) {
	return elm$parser$Parser$Advanced$problem(
		elm$parser$Parser$Problem(msg));
};
var justinmimbs$date$Date$resultToParser = function (result) {
	if (result.$ === 'Ok') {
		var x = result.a;
		return elm$parser$Parser$succeed(x);
	} else {
		var message = result.a;
		return elm$parser$Parser$problem(message);
	}
};
var justinmimbs$date$Date$parser = A2(
	elm$parser$Parser$andThen,
	A2(elm$core$Basics$composeR, justinmimbs$date$Date$fromYearAndDayOfYear, justinmimbs$date$Date$resultToParser),
	A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			elm$parser$Parser$succeed(elm$core$Tuple$pair),
			justinmimbs$date$Date$int4),
		justinmimbs$date$Date$dayOfYear));
var justinmimbs$date$Date$fromIsoString = A2(
	elm$core$Basics$composeR,
	elm$parser$Parser$run(
		A2(
			elm$parser$Parser$keeper,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			A2(
				elm$parser$Parser$ignorer,
				justinmimbs$date$Date$parser,
				A2(
					elm$parser$Parser$andThen,
					justinmimbs$date$Date$resultToParser,
					elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(elm$parser$Parser$map, elm$core$Result$Ok, elm$parser$Parser$end),
								A2(
								elm$parser$Parser$map,
								elm$core$Basics$always(
									elm$core$Result$Err('Expected a date only, not a date and time')),
								elm$parser$Parser$chompIf(
									elm$core$Basics$eq(
										_Utils_chr('T')))),
								elm$parser$Parser$succeed(
								elm$core$Result$Err('Expected a date only'))
							])))))),
	elm$core$Result$mapError(
		A2(
			elm$core$Basics$composeR,
			elm$core$List$map(justinmimbs$date$Date$deadEndToString),
			elm$core$String$join('; '))));
var author$project$Utils$DateDecoder$decoder = A2(
	elm$json$Json$Decode$andThen,
	A2(elm$core$Basics$composeR, justinmimbs$date$Date$fromIsoString, elm_community$json_extra$Json$Decode$Extra$fromResult),
	elm$json$Json$Decode$string);
var author$project$Api$date = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, author$project$Api$DateType, author$project$Utils$DateDecoder$decoder);
var author$project$Api$TimeDeltaType = {$: 'TimeDeltaType'};
var author$project$Utils$TimeDelta$parseInt = function (str) {
	return A2(
		elm$core$Maybe$withDefault,
		-1,
		elm$core$String$toInt(str));
};
var elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, list);
			var jsArray = _n0.a;
			var remainingItems = _n0.b;
			if (_Utils_cmp(
				elm$core$Elm$JsArray$length(jsArray),
				elm$core$Array$branchFactor) < 0) {
				return A2(
					elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					elm$core$List$cons,
					elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return elm$core$Array$empty;
	} else {
		return A3(elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$core$Array$bitMask = 4294967295 >>> (32 - elm$core$Array$shiftStep);
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = elm$core$Array$bitMask & (index >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_n0.$ === 'SubTree') {
				var subTree = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _n0.a;
				return A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, values);
			}
		}
	});
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var elm$core$Array$get = F2(
	function (index, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? elm$core$Maybe$Just(
			A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, tail)) : elm$core$Maybe$Just(
			A3(elm$core$Array$getHelp, startShift, index, tree)));
	});
var elm$core$Array$length = function (_n0) {
	var len = _n0.a;
	return len;
};
var elm$regex$Regex$split = _Regex_splitAtMost(_Regex_infinity);
var author$project$Utils$TimeDelta$parse = function (string) {
	var spaceAndColon = A2(
		elm$core$Maybe$withDefault,
		elm$regex$Regex$never,
		elm$regex$Regex$fromString('\\s|:'));
	var timeArray = elm$core$Array$fromList(
		A2(
			elm$core$List$filter,
			function (x) {
				return x >= 0;
			},
			A2(
				elm$core$List$map,
				author$project$Utils$TimeDelta$parseInt,
				A2(elm$regex$Regex$split, spaceAndColon, string))));
	var _n0 = elm$core$Array$length(timeArray);
	switch (_n0) {
		case 2:
			return elm$core$Result$Ok(
				{
					days: 0,
					hours: A2(
						elm$core$Maybe$withDefault,
						0,
						A2(elm$core$Array$get, 0, timeArray)),
					minutes: A2(
						elm$core$Maybe$withDefault,
						0,
						A2(elm$core$Array$get, 1, timeArray)),
					seconds: 0
				});
		case 3:
			return elm$core$Result$Ok(
				{
					days: 0,
					hours: A2(
						elm$core$Maybe$withDefault,
						0,
						A2(elm$core$Array$get, 0, timeArray)),
					minutes: A2(
						elm$core$Maybe$withDefault,
						0,
						A2(elm$core$Array$get, 1, timeArray)),
					seconds: A2(
						elm$core$Maybe$withDefault,
						0,
						A2(elm$core$Array$get, 2, timeArray))
				});
		case 4:
			return elm$core$Result$Ok(
				{
					days: A2(
						elm$core$Maybe$withDefault,
						0,
						A2(elm$core$Array$get, 0, timeArray)),
					hours: A2(
						elm$core$Maybe$withDefault,
						0,
						A2(elm$core$Array$get, 1, timeArray)),
					minutes: A2(
						elm$core$Maybe$withDefault,
						0,
						A2(elm$core$Array$get, 2, timeArray)),
					seconds: A2(
						elm$core$Maybe$withDefault,
						0,
						A2(elm$core$Array$get, 3, timeArray))
				});
		default:
			return elm$core$Result$Err('invalid format');
	}
};
var author$project$Utils$TimeDelta$decoder = A2(
	elm$json$Json$Decode$andThen,
	A2(elm$core$Basics$composeR, author$project$Utils$TimeDelta$parse, elm_community$json_extra$Json$Decode$Extra$fromResult),
	elm$json$Json$Decode$string);
var author$project$Api$timeDelta = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$customScalar, author$project$Api$TimeDeltaType, author$project$Utils$TimeDelta$decoder);
var author$project$Types$Timelog$ProjectRefQuery = function (id) {
	return {id: id};
};
var author$project$Api$Timelog$projectRefObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, author$project$Api$uuid),
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$Timelog$ProjectRefQuery));
var author$project$Types$Timelog$Timelog = F5(
	function (id, description, duration, date, project) {
		return {date: date, description: description, duration: duration, id: id, project: project};
	});
var author$project$Api$Timelog$timelogObject = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
	A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'project', _List_Nil, author$project$Api$Timelog$projectRefObject),
	A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'date', _List_Nil, author$project$Api$date),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'duration', _List_Nil, author$project$Api$timeDelta),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'description', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$string),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'id', _List_Nil, author$project$Api$uuid),
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$Timelog$Timelog))))));
var author$project$Types$Timelog$EditTimelogRequest = F2(
	function (timelog, allProjects) {
		return {allProjects: allProjects, timelog: timelog};
	});
var author$project$Api$Timelog$editTimelogQuery = function (uuid) {
	var timelogIDVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'taskId',
		function ($) {
			return $.timelogId;
		},
		author$project$Api$uuidVar);
	var queryRoot = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'allProjects',
			_List_Nil,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$Api$Project$projectsObject)),
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'timelog',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'id',
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(timelogIDVar))
					]),
				author$project$Api$Timelog$timelogObject),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$Timelog$EditTimelogRequest)));
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
		{timelogId: uuid},
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot));
};
var author$project$Page$Timelogs$EditTimelog$ReceiveEditTimelogResponse = function (a) {
	return {$: 'ReceiveEditTimelogResponse', a: a};
};
var author$project$Page$Timelogs$EditTimelog$sendEditTimelogQuery = F2(
	function (csrf, uuid) {
		return A2(
			elm$core$Task$attempt,
			author$project$Page$Timelogs$EditTimelog$ReceiveEditTimelogResponse,
			A2(
				author$project$Api$sendQueryRequest,
				csrf,
				author$project$Api$Timelog$editTimelogQuery(uuid)));
	});
var author$project$Page$Timelogs$EditTimelog$init = F3(
	function (flags, url, key) {
		var route = author$project$Route$fromUrl(url);
		return _Utils_Tuple2(
			{errResult: elm$core$Maybe$Nothing, isPending: false, showModal: false, updateForm: elm$core$Maybe$Nothing},
			function () {
				if (route.$ === 'EditTimelogR') {
					var uuid = route.a;
					return A2(author$project$Page$Timelogs$EditTimelog$sendEditTimelogQuery, flags.csrftoken, uuid);
				} else {
					return elm$core$Platform$Cmd$none;
				}
			}());
	});
var author$project$Types$User$UsersRequest = function (allUsers) {
	return {allUsers: allUsers};
};
var author$project$Api$User$usersQuery = function () {
	var queryRoot = A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'allUsers',
			_List_Nil,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$Api$User$userObject)),
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$User$UsersRequest));
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
		_Utils_Tuple0,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot));
}();
var author$project$Page$Users$ReceiveUsersResponse = function (a) {
	return {$: 'ReceiveUsersResponse', a: a};
};
var author$project$Page$Users$sendUsersQuery = function (csrf) {
	return A2(
		elm$core$Task$attempt,
		author$project$Page$Users$ReceiveUsersResponse,
		A2(author$project$Api$sendQueryRequest, csrf, author$project$Api$User$usersQuery));
};
var author$project$Page$Users$init = F3(
	function (flags, url, key) {
		var route = author$project$Route$fromUrl(url);
		return _Utils_Tuple2(
			{errResult: elm$core$Maybe$Nothing, isPending: false, readyUsers: false, users: _List_Nil},
			function () {
				if (route.$ === 'UsersR') {
					return author$project$Page$Users$sendUsersQuery(flags.csrftoken);
				} else {
					return elm$core$Platform$Cmd$none;
				}
			}());
	});
var elm$core$Platform$Cmd$map = _Platform_map;
var author$project$Main$init = F3(
	function (flags, url, key) {
		var _n0 = A3(author$project$Page$Users$init, flags, url, key);
		var userModel = _n0.a;
		var userCmd = _n0.b;
		var _n1 = A3(author$project$Page$Timelogs$init, flags, url, key);
		var timelogModel = _n1.a;
		var timelogCmd = _n1.b;
		var _n2 = A3(author$project$Page$Projects$init, flags, url, key);
		var projectModel = _n2.a;
		var projectCmd = _n2.b;
		var _n3 = A3(author$project$Page$Profile$init, flags, url, key);
		var profileModel = _n3.a;
		var profileCmd = _n3.b;
		var _n4 = A3(author$project$Page$Timelogs$EditTimelog$init, flags, url, key);
		var editTimelogModel = _n4.a;
		var editTimelogCmd = _n4.b;
		var _n5 = A3(author$project$Page$Projects$EditProject$init, flags, url, key);
		var editProjectModel = _n5.a;
		var editProjectCmd = _n5.b;
		var _n6 = A3(author$project$Page$Timelogs$AddTimelog$init, flags, url, key);
		var addTimelogModel = _n6.a;
		var addTimelogCmd = _n6.b;
		var _n7 = A3(author$project$Page$Projects$AddProject$init, flags, url, key);
		var addProjectModel = _n7.a;
		var addProjectCmd = _n7.b;
		return _Utils_Tuple2(
			{
				addProjectModel: addProjectModel,
				addTimelogModel: addTimelogModel,
				editProjectModel: editProjectModel,
				editTimelogModel: editTimelogModel,
				errorMsg: elm$core$Maybe$Nothing,
				flags: flags,
				key: key,
				profileModel: profileModel,
				projectModel: projectModel,
				route: author$project$Route$fromUrl(url),
				showMenu: false,
				timelogModel: timelogModel,
				today: A2(
					justinmimbs$date$Date$fromPosix,
					elm$time$Time$utc,
					elm$time$Time$millisToPosix(0)),
				url: url,
				userModel: userModel
			},
			elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2(elm$core$Platform$Cmd$map, author$project$Main$TimelogMsg, timelogCmd),
						A2(elm$core$Platform$Cmd$map, author$project$Main$AddTimelogMsg, addTimelogCmd),
						A2(elm$core$Platform$Cmd$map, author$project$Main$EditTimelogMsg, editTimelogCmd),
						A2(elm$core$Platform$Cmd$map, author$project$Main$ProjectMsg, projectCmd),
						A2(elm$core$Platform$Cmd$map, author$project$Main$AddProjectMsg, addProjectCmd),
						A2(elm$core$Platform$Cmd$map, author$project$Main$EditProjectMsg, editProjectCmd),
						A2(elm$core$Platform$Cmd$map, author$project$Main$UserMsg, userCmd),
						A2(elm$core$Platform$Cmd$map, author$project$Main$ProfileMsg, profileCmd)
					])));
	});
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var author$project$Main$subscriptions = function (_n0) {
	return elm$core$Platform$Sub$none;
};
var author$project$Main$handleRoute = function (model) {
	var flags = model.flags;
	var url = model.url;
	var key = model.key;
	var route = author$project$Route$fromUrl(url);
	var _n0 = A3(author$project$Page$Users$init, flags, url, key);
	var userCmd = _n0.b;
	var _n1 = A3(author$project$Page$Timelogs$init, flags, url, key);
	var timelogCmd = _n1.b;
	var _n2 = A3(author$project$Page$Projects$init, flags, url, key);
	var projectCmd = _n2.b;
	var _n3 = A3(author$project$Page$Profile$init, flags, url, key);
	var profileCmd = _n3.b;
	var _n4 = A3(author$project$Page$Timelogs$EditTimelog$init, flags, url, key);
	var editTimelogCmd = _n4.b;
	var _n5 = A3(author$project$Page$Projects$EditProject$init, flags, url, key);
	var editProjectCmd = _n5.b;
	var _n6 = A3(author$project$Page$Timelogs$AddTimelog$init, flags, url, key);
	var addTimelogCmd = _n6.b;
	var _n7 = A3(author$project$Page$Projects$AddProject$init, flags, url, key);
	var addProjectCmd = _n7.b;
	return _Utils_Tuple2(
		model,
		elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					A2(elm$core$Platform$Cmd$map, author$project$Main$TimelogMsg, timelogCmd),
					A2(elm$core$Platform$Cmd$map, author$project$Main$AddTimelogMsg, addTimelogCmd),
					A2(elm$core$Platform$Cmd$map, author$project$Main$EditTimelogMsg, editTimelogCmd),
					A2(elm$core$Platform$Cmd$map, author$project$Main$ProjectMsg, projectCmd),
					A2(elm$core$Platform$Cmd$map, author$project$Main$AddProjectMsg, addProjectCmd),
					A2(elm$core$Platform$Cmd$map, author$project$Main$EditProjectMsg, editProjectCmd),
					A2(elm$core$Platform$Cmd$map, author$project$Main$UserMsg, userCmd)
				])));
};
var author$project$Page$Profile$update = F2(
	function (msg, model) {
		if (msg.a.$ === 'Err') {
			var err = msg.a.a;
			return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		} else {
			var response = msg.a.a;
			var profileModel = model.profileModel;
			var newProfileModel = _Utils_update(
				profileModel,
				{
					user: elm$core$Maybe$Just(response.profile)
				});
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{profileModel: newProfileModel}),
				elm$core$Platform$Cmd$none);
		}
	});
var author$project$Page$Projects$update = F2(
	function (msg, model) {
		var timelogModel = model.timelogModel;
		var projectModel = model.projectModel;
		var flags = model.flags;
		if (msg.a.$ === 'Err') {
			var err = msg.a.a;
			return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		} else {
			var response = msg.a.a;
			var newProjectModel = _Utils_update(
				projectModel,
				{
					projects: elm$core$Array$fromList(response.allProjects),
					readyProjects: true
				});
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{projectModel: newProjectModel}),
				elm$core$Platform$Cmd$none);
		}
	});
var author$project$Types$Project$CreateProjectForm = F5(
	function (name, colour, company, abbreviation, workDayHours) {
		return {abbreviation: abbreviation, colour: colour, company: company, name: name, workDayHours: workDayHours};
	});
var author$project$Page$Projects$AddProject$hasProjectForm = function (project) {
	if (project.$ === 'Just') {
		var value = project.a;
		return value;
	} else {
		return A5(author$project$Types$Project$CreateProjectForm, '', '', '', '', 0);
	}
};
var author$project$Page$Projects$AddProject$passToModel = F2(
	function (addProjectModel, model) {
		return _Utils_update(
			model,
			{addProjectModel: addProjectModel});
	});
var jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation = jamesmacaulay$elm_graphql$GraphQL$Client$Http$send;
var author$project$Api$sendMutationRequest = F2(
	function (csrf, request) {
		var options = author$project$Api$requestOptions(csrf);
		return A2(jamesmacaulay$elm_graphql$GraphQL$Client$Http$customSendMutation, options, request);
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$MutationOperationType = {$: 'MutationOperationType'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationOperationType = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$MutationOperationType;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument = function (spec) {
	return jamesmacaulay$elm_graphql$GraphQL$Request$Builder$document(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Operation(
			{directives: _List_Nil, name: elm$core$Maybe$Nothing, operationType: jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationOperationType, spec: spec}));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Field = F3(
	function (a, b, c) {
		return {$: 'Field', a: a, b: b, c: c};
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field = F3(
	function (fieldName, extract, _n0) {
		var typeRef = _n0.b;
		var convert = _n0.c;
		return A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$Field,
			fieldName,
			typeRef,
			A2(
				elm$core$Basics$composeR,
				extract,
				A2(elm$core$Basics$composeR, convert, elm$core$Maybe$Just)));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$int = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$namedType('Int');
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$IntValue = function (a) {
	return {$: 'IntValue', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$int = A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$int, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$IntValue);
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ListTypeRef = function (a) {
	return {$: 'ListTypeRef', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$list = A2(
	elm$core$Basics$composeL,
	jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$TypeRef(jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$NonNull),
	jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ListTypeRef);
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ListValue = function (a) {
	return {$: 'ListValue', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$list = function (_n0) {
	var typeRef = _n0.b;
	var convert = _n0.c;
	return A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$list(typeRef),
		A2(
			elm$core$Basics$composeR,
			elm$core$List$map(convert),
			jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ListValue));
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$fieldTuple = F2(
	function (source, _n0) {
		var fieldName = _n0.a;
		var convert = _n0.c;
		return A2(
			elm$core$Maybe$map,
			function (value) {
				return _Utils_Tuple2(fieldName, value);
			},
			convert(source));
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ObjectValue = function (a) {
	return {$: 'ObjectValue', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$object = F2(
	function (typeName, fields) {
		return A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull,
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$namedType(typeName),
			function (source) {
				return jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$ObjectValue(
					A2(
						elm$core$List$filterMap,
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$fieldTuple(source),
						fields));
			});
	});
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$string = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$namedType('String');
var jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$StringValue = function (a) {
	return {$: 'StringValue', a: a};
};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string = A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$VariableSpec, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$NonNull, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$TypeRef$string, jamesmacaulay$elm_graphql$GraphQL$Request$Document$AST$StringValue);
var author$project$Api$Project$createProjectMutation = function (project) {
	var projectVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'input',
		function ($) {
			return $.input;
		},
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$object,
			'ProjectInput',
			_List_fromArray(
				[
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'name',
					function ($) {
						return $.name;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'colour',
					function ($) {
						return $.colour;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'company',
					function ($) {
						return $.company;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'abbreviation',
					function ($) {
						return $.abbreviation;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'workDayHours',
					function ($) {
						return $.workDayHours;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$int),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'addMembers',
					function ($) {
						return $.addMembers;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$list(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string))
				])));
	var mutationRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'createProject',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'input',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(projectVar))
				]),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'project', _List_Nil, author$project$Api$Project$projectsObject))));
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
		project,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(mutationRoot));
};
var author$project$Types$Project$CreateProjectMutation = F6(
	function (name, colour, company, abbreviation, workDayHours, addMembers) {
		return {abbreviation: abbreviation, addMembers: addMembers, colour: colour, company: company, name: name, workDayHours: workDayHours};
	});
var author$project$Api$Project$convertToCreateProjectMutation = F2(
	function (project, addMembers) {
		var addMembersStrings = A2(
			elm$core$List$map,
			function (x) {
				return danyx23$elm_uuid$Uuid$toString(x.id);
			},
			addMembers);
		return A6(author$project$Types$Project$CreateProjectMutation, project.name, project.colour, project.company, project.abbreviation, project.workDayHours, addMembersStrings);
	});
var author$project$Api$Project$processCreateProjectInput = F2(
	function (project, addMembers) {
		var newProject = A2(author$project$Api$Project$convertToCreateProjectMutation, project, addMembers);
		return {input: newProject};
	});
var author$project$Page$Projects$AddProject$ReceiveCreateProjectMutationResponse = function (a) {
	return {$: 'ReceiveCreateProjectMutationResponse', a: a};
};
var author$project$Page$Projects$AddProject$sendCreateProjectMutation = function (model) {
	var addProjectModel = model.addProjectModel;
	var _n0 = addProjectModel.createForm;
	if (_n0.$ === 'Just') {
		var createForm = _n0.a;
		return A2(
			elm$core$Task$attempt,
			author$project$Page$Projects$AddProject$ReceiveCreateProjectMutationResponse,
			A2(
				author$project$Api$sendMutationRequest,
				model.flags.csrftoken,
				author$project$Api$Project$createProjectMutation(
					A2(author$project$Api$Project$processCreateProjectInput, createForm, addProjectModel.addMembers))));
	} else {
		return elm$core$Platform$Cmd$none;
	}
};
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$json$Json$Decode$map = _Json_map1;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var elm$core$Elm$JsArray$push = _JsArray_push;
var elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					elm$core$Elm$JsArray$push,
					elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = elm$core$Array$SubTree(
					A4(elm$core$Array$insertTailInTree, shift - elm$core$Array$shiftStep, index, tail, elm$core$Elm$JsArray$empty));
				return A2(elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (value.$ === 'SubTree') {
				var subTree = value.a;
				var newSub = elm$core$Array$SubTree(
					A4(elm$core$Array$insertTailInTree, shift - elm$core$Array$shiftStep, index, tail, subTree));
				return A3(elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = elm$core$Array$SubTree(
					A4(
						elm$core$Array$insertTailInTree,
						shift - elm$core$Array$shiftStep,
						index,
						tail,
						elm$core$Elm$JsArray$singleton(value)));
				return A3(elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		var originalTailLen = elm$core$Elm$JsArray$length(tail);
		var newTailLen = elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + elm$core$Array$shiftStep;
				var newTree = A4(
					elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					elm$core$Elm$JsArray$singleton(
						elm$core$Array$SubTree(tree)));
				return A4(elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4(elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4(elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			elm$core$Array$unsafeReplaceTail,
			A2(elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var author$project$Page$Projects$AddProject$update = F2(
	function (msg, model) {
		var addProjectModel = model.addProjectModel;
		var projectModel = model.projectModel;
		var userModel = model.userModel;
		switch (msg.$) {
			case 'ReceiveAddProjectResponse':
				if (msg.a.$ === 'Err') {
					var err = msg.a.a;
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				} else {
					var response = msg.a.a;
					var newUserModel = _Utils_update(
						userModel,
						{users: response.allUsers});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{userModel: newUserModel}),
						elm$core$Platform$Cmd$none);
				}
			case 'SubmitCreateProject':
				var newProjectModel = _Utils_update(
					addProjectModel,
					{isPending: true});
				return _Utils_Tuple2(
					A2(author$project$Page$Projects$AddProject$passToModel, newProjectModel, model),
					author$project$Page$Projects$AddProject$sendCreateProjectMutation(model));
			case 'ReceiveCreateProjectMutationResponse':
				if (msg.a.$ === 'Err') {
					var err = msg.a.a;
					var newProjectModel = _Utils_update(
						addProjectModel,
						{isPending: false});
					var newModel = _Utils_update(
						model,
						{
							errorMsg: elm$core$Maybe$Just(err)
						});
					return _Utils_Tuple2(
						A2(author$project$Page$Projects$AddProject$passToModel, newProjectModel, newModel),
						elm$core$Platform$Cmd$none);
				} else {
					var response = msg.a.a;
					var projects = A2(elm$core$Array$push, response, projectModel.projects);
					var newProjectModel = _Utils_update(
						projectModel,
						{projects: projects});
					var newAddProjectModel = _Utils_update(
						addProjectModel,
						{addMembers: _List_Nil, createForm: elm$core$Maybe$Nothing, isPending: false});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{addProjectModel: newAddProjectModel, projectModel: newProjectModel}),
						elm$core$Platform$Cmd$none);
				}
			case 'InputCreateProjectName':
				var string = msg.a;
				var project = author$project$Page$Projects$AddProject$hasProjectForm(addProjectModel.createForm);
				var newProject = _Utils_update(
					project,
					{name: string});
				return _Utils_Tuple2(
					A2(
						author$project$Page$Projects$AddProject$passToModel,
						_Utils_update(
							addProjectModel,
							{
								createForm: elm$core$Maybe$Just(newProject)
							}),
						model),
					elm$core$Platform$Cmd$none);
			case 'InputCreateProjectAbbreviation':
				var string = msg.a;
				var project = author$project$Page$Projects$AddProject$hasProjectForm(addProjectModel.createForm);
				var newProject = _Utils_update(
					project,
					{abbreviation: string});
				return _Utils_Tuple2(
					A2(
						author$project$Page$Projects$AddProject$passToModel,
						_Utils_update(
							addProjectModel,
							{
								createForm: elm$core$Maybe$Just(newProject)
							}),
						model),
					elm$core$Platform$Cmd$none);
			case 'InputCreateProjectColour':
				var string = msg.a;
				var project = author$project$Page$Projects$AddProject$hasProjectForm(addProjectModel.createForm);
				var newProject = _Utils_update(
					project,
					{colour: string});
				return _Utils_Tuple2(
					A2(
						author$project$Page$Projects$AddProject$passToModel,
						_Utils_update(
							addProjectModel,
							{
								createForm: elm$core$Maybe$Just(newProject)
							}),
						model),
					elm$core$Platform$Cmd$none);
			case 'InputCreateProjectCompany':
				var string = msg.a;
				var project = author$project$Page$Projects$AddProject$hasProjectForm(addProjectModel.createForm);
				var newProject = _Utils_update(
					project,
					{company: string});
				return _Utils_Tuple2(
					A2(
						author$project$Page$Projects$AddProject$passToModel,
						_Utils_update(
							addProjectModel,
							{
								createForm: elm$core$Maybe$Just(newProject)
							}),
						model),
					elm$core$Platform$Cmd$none);
			case 'InputCreateProjectWorkDay':
				var string = msg.a;
				var project = author$project$Page$Projects$AddProject$hasProjectForm(addProjectModel.createForm);
				var newProject = _Utils_update(
					project,
					{
						workDayHours: A2(
							elm$core$Maybe$withDefault,
							0,
							elm$core$String$toInt(string))
					});
				return _Utils_Tuple2(
					A2(
						author$project$Page$Projects$AddProject$passToModel,
						_Utils_update(
							addProjectModel,
							{
								createForm: elm$core$Maybe$Just(newProject)
							}),
						model),
					elm$core$Platform$Cmd$none);
			case 'CancelAdd':
				var newAddProjectModel = _Utils_update(
					addProjectModel,
					{createForm: elm$core$Maybe$Nothing});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{addProjectModel: newAddProjectModel}),
					A2(elm$browser$Browser$Navigation$pushUrl, model.key, '/projects'));
			case 'AddMembers':
				var user = msg.a;
				var newAddProjectModel = _Utils_update(
					addProjectModel,
					{
						addMembers: A2(elm$core$List$cons, user, addProjectModel.addMembers)
					});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{addProjectModel: newAddProjectModel}),
					elm$core$Platform$Cmd$none);
			default:
				var user = msg.a;
				var newAddProjectModel = _Utils_update(
					addProjectModel,
					{
						addMembers: A2(
							elm$core$List$filter,
							function (x) {
								return !_Utils_eq(x, user);
							},
							addProjectModel.addMembers)
					});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{addProjectModel: newAddProjectModel}),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Page$Projects$EditProject$passToModel = F2(
	function (projectModel, model) {
		return _Utils_update(
			model,
			{editProjectModel: projectModel});
	});
var author$project$Page$Projects$EditProject$redirectToProjectsPage = function (model) {
	return A2(elm$browser$Browser$Navigation$pushUrl, model.key, '/projects');
};
var author$project$Types$Project$ProjectDeleteMutationResult = F2(
	function (projectId, ok) {
		return {ok: ok, projectId: projectId};
	});
var elm$json$Json$Decode$bool = _Json_decodeBool;
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$BooleanType = {$: 'BooleanType'};
var jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool = A2(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$primitiveSpec, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$BooleanType, elm$json$Json$Decode$bool);
var author$project$Api$Project$deleteProjectMutation = function (project) {
	var projectVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'input',
		function ($) {
			return $.input;
		},
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$object,
			'DeleteProjectInput',
			_List_fromArray(
				[
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'id',
					function ($) {
						return $.id;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string)
				])));
	var mutationRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'deleteProject',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'input',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(projectVar))
				]),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'ok', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'projectId', _List_Nil, author$project$Api$uuid),
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$Project$ProjectDeleteMutationResult)))));
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
		project,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(mutationRoot));
};
var author$project$Types$Project$DeleteProjectMutation = function (id) {
	return {id: id};
};
var author$project$Api$Project$convertToDeleteProjectMutation = function (id) {
	return author$project$Types$Project$DeleteProjectMutation(
		danyx23$elm_uuid$Uuid$toString(id));
};
var author$project$Api$Project$processDeleteProjectInput = function (id) {
	var newProject = author$project$Api$Project$convertToDeleteProjectMutation(id);
	return {input: newProject};
};
var author$project$Page$Projects$EditProject$ReceiveDeleteProjectMutationResponse = function (a) {
	return {$: 'ReceiveDeleteProjectMutationResponse', a: a};
};
var author$project$Page$Projects$EditProject$sendDeleteProjectMutation = function (model) {
	var editProjectModel = model.editProjectModel;
	var _n0 = editProjectModel.updateForm;
	if (_n0.$ === 'Just') {
		var form = _n0.a;
		return A2(
			elm$core$Task$attempt,
			author$project$Page$Projects$EditProject$ReceiveDeleteProjectMutationResponse,
			A2(
				author$project$Api$sendMutationRequest,
				model.flags.csrftoken,
				author$project$Api$Project$deleteProjectMutation(
					author$project$Api$Project$processDeleteProjectInput(form.id))));
	} else {
		return elm$core$Platform$Cmd$none;
	}
};
var author$project$Types$Project$UpdateProjectMutation = F8(
	function (id, name, colour, company, abbreviation, workDayHours, addMembers, removeMembers) {
		return {abbreviation: abbreviation, addMembers: addMembers, colour: colour, company: company, id: id, name: name, removeMembers: removeMembers, workDayHours: workDayHours};
	});
var author$project$Api$Project$convertToUpdateProjectMutation = F3(
	function (project, addMembers, removeMembers) {
		var removeMembersStrings = A2(
			elm$core$List$map,
			function (x) {
				return danyx23$elm_uuid$Uuid$toString(x.id);
			},
			removeMembers);
		var addMembersStrings = A2(
			elm$core$List$map,
			function (x) {
				return danyx23$elm_uuid$Uuid$toString(x.id);
			},
			addMembers);
		return A8(
			author$project$Types$Project$UpdateProjectMutation,
			danyx23$elm_uuid$Uuid$toString(project.id),
			project.name,
			project.colour,
			project.company,
			project.abbreviation,
			project.workDayHours,
			addMembersStrings,
			removeMembersStrings);
	});
var author$project$Api$Project$processUpdateProjectInput = F3(
	function (project, addMembers, removeMembers) {
		var newProject = A3(author$project$Api$Project$convertToUpdateProjectMutation, project, addMembers, removeMembers);
		return {input: newProject};
	});
var author$project$Types$Project$ProjectMutationResult = F2(
	function (project, ok) {
		return {ok: ok, project: project};
	});
var author$project$Api$Project$updateProjectMutation = function (project) {
	var projectVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'input',
		function ($) {
			return $.input;
		},
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$object,
			'UpdateProjectInput',
			_List_fromArray(
				[
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'id',
					function ($) {
						return $.id;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'name',
					function ($) {
						return $.name;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'colour',
					function ($) {
						return $.colour;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'company',
					function ($) {
						return $.company;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'abbreviation',
					function ($) {
						return $.abbreviation;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'workDayHours',
					function ($) {
						return $.workDayHours;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$int),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'addMembers',
					function ($) {
						return $.addMembers;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$list(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string)),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'removeMembers',
					function ($) {
						return $.removeMembers;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$list(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string))
				])));
	var mutationRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'updateProject',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'input',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(projectVar))
				]),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'ok', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'project', _List_Nil, author$project$Api$Project$projectsObject),
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$Project$ProjectMutationResult)))));
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
		project,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(mutationRoot));
};
var author$project$Page$Projects$EditProject$ReceiveUpdateProjectMutationResponse = function (a) {
	return {$: 'ReceiveUpdateProjectMutationResponse', a: a};
};
var author$project$Page$Projects$EditProject$sendUpdateProjectMutation = function (model) {
	var editProjectModel = model.editProjectModel;
	var _n0 = editProjectModel.updateForm;
	if (_n0.$ === 'Just') {
		var updateForm = _n0.a;
		return A2(
			elm$core$Task$attempt,
			author$project$Page$Projects$EditProject$ReceiveUpdateProjectMutationResponse,
			A2(
				author$project$Api$sendMutationRequest,
				model.flags.csrftoken,
				author$project$Api$Project$updateProjectMutation(
					A3(author$project$Api$Project$processUpdateProjectInput, updateForm, editProjectModel.addMembers, editProjectModel.removeMembers))));
	} else {
		return elm$core$Platform$Cmd$none;
	}
};
var elm$core$Array$filter = F2(
	function (isGood, array) {
		return elm$core$Array$fromList(
			A3(
				elm$core$Array$foldr,
				F2(
					function (x, xs) {
						return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
					}),
				_List_Nil,
				array));
	});
var elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var elm$core$Array$indexedMap = F2(
	function (func, _n0) {
		var len = _n0.a;
		var tree = _n0.c;
		var tail = _n0.d;
		var initialBuilder = {
			nodeList: _List_Nil,
			nodeListSize: 0,
			tail: A3(
				elm$core$Elm$JsArray$indexedMap,
				func,
				elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.nodeListSize * elm$core$Array$branchFactor;
					var mappedLeaf = elm$core$Array$Leaf(
						A3(elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						nodeList: A2(elm$core$List$cons, mappedLeaf, builder.nodeList),
						nodeListSize: builder.nodeListSize + 1,
						tail: builder.tail
					};
				}
			});
		return A2(
			elm$core$Array$builderToArray,
			true,
			A3(elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = elm$core$Array$bitMask & (index >>> shift);
		var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (_n0.$ === 'SubTree') {
			var subTree = _n0.a;
			var newSub = A4(elm$core$Array$setHelp, shift - elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				elm$core$Elm$JsArray$unsafeSet,
				pos,
				elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _n0.a;
			var newLeaf = A3(elm$core$Elm$JsArray$unsafeSet, elm$core$Array$bitMask & index, value, values);
			return A3(
				elm$core$Elm$JsArray$unsafeSet,
				pos,
				elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3(elm$core$Elm$JsArray$unsafeSet, elm$core$Array$bitMask & index, value, tail)) : A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4(elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var author$project$Page$Projects$EditProject$update = F2(
	function (msg, model) {
		var timelogModel = model.timelogModel;
		var projectModel = model.projectModel;
		var editProjectModel = model.editProjectModel;
		var userModel = model.userModel;
		switch (msg.$) {
			case 'ReceiveEditProjectResponse':
				if (msg.a.$ === 'Err') {
					var err = msg.a.a;
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				} else {
					var response = msg.a.a;
					var newUserModel = _Utils_update(
						userModel,
						{users: response.allUsers});
					var newProjectModel = _Utils_update(
						editProjectModel,
						{
							updateForm: elm$core$Maybe$Just(response.project)
						});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{editProjectModel: newProjectModel, userModel: newUserModel}),
						elm$core$Platform$Cmd$none);
				}
			case 'ReceiveUpdateProjectMutationResponse':
				if (msg.a.$ === 'Err') {
					var err = msg.a.a;
					var newProjectModel = _Utils_update(
						editProjectModel,
						{isPending: false});
					var newModel = _Utils_update(
						model,
						{
							errorMsg: elm$core$Maybe$Just(err)
						});
					return _Utils_Tuple2(
						A2(author$project$Page$Projects$EditProject$passToModel, newProjectModel, newModel),
						elm$core$Platform$Cmd$none);
				} else {
					var response = msg.a.a;
					var projectPositions = A2(
						elm$core$Array$indexedMap,
						F2(
							function (i, x) {
								return _Utils_Tuple2(i, x.id);
							}),
						projectModel.projects);
					var projectPosition = A2(
						elm$core$Array$filter,
						function (x) {
							return _Utils_eq(x.b, response.project.id);
						},
						projectPositions);
					var projectIndex = function () {
						var _n1 = A2(elm$core$Array$get, 0, projectPosition);
						if (_n1.$ === 'Just') {
							var val = _n1.a;
							return val.a;
						} else {
							return 0;
						}
					}();
					var projects = A3(elm$core$Array$set, projectIndex, response.project, projectModel.projects);
					var newProjectModel = _Utils_update(
						projectModel,
						{projects: projects});
					var newEditProjectModel = _Utils_update(
						editProjectModel,
						{addMembers: _List_Nil, isPending: false, removeMembers: _List_Nil, updateForm: elm$core$Maybe$Nothing});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{editProjectModel: newEditProjectModel, projectModel: newProjectModel}),
						author$project$Page$Projects$EditProject$redirectToProjectsPage(model));
				}
			case 'SubmitEditProject':
				var newProjectModel = _Utils_update(
					editProjectModel,
					{isPending: true});
				return _Utils_Tuple2(
					A2(author$project$Page$Projects$EditProject$passToModel, newProjectModel, model),
					author$project$Page$Projects$EditProject$sendUpdateProjectMutation(model));
			case 'InputUpdateProjectName':
				var string = msg.a;
				var _n2 = editProjectModel.updateForm;
				if (_n2.$ === 'Just') {
					var updateForm = _n2.a;
					var newProject = _Utils_update(
						updateForm,
						{name: string});
					return _Utils_Tuple2(
						A2(
							author$project$Page$Projects$EditProject$passToModel,
							_Utils_update(
								editProjectModel,
								{
									updateForm: elm$core$Maybe$Just(newProject)
								}),
							model),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'InputUpdateProjectAbbreviation':
				var string = msg.a;
				var _n3 = editProjectModel.updateForm;
				if (_n3.$ === 'Just') {
					var updateForm = _n3.a;
					var newProject = _Utils_update(
						updateForm,
						{abbreviation: string});
					return _Utils_Tuple2(
						A2(
							author$project$Page$Projects$EditProject$passToModel,
							_Utils_update(
								editProjectModel,
								{
									updateForm: elm$core$Maybe$Just(newProject)
								}),
							model),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'InputUpdateProjectColour':
				var string = msg.a;
				var _n4 = editProjectModel.updateForm;
				if (_n4.$ === 'Just') {
					var updateForm = _n4.a;
					var newProject = _Utils_update(
						updateForm,
						{colour: string});
					return _Utils_Tuple2(
						A2(
							author$project$Page$Projects$EditProject$passToModel,
							_Utils_update(
								editProjectModel,
								{
									updateForm: elm$core$Maybe$Just(newProject)
								}),
							model),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'InputUpdateProjectCompany':
				var string = msg.a;
				var _n5 = editProjectModel.updateForm;
				if (_n5.$ === 'Just') {
					var updateForm = _n5.a;
					var newProject = _Utils_update(
						updateForm,
						{company: string});
					return _Utils_Tuple2(
						A2(
							author$project$Page$Projects$EditProject$passToModel,
							_Utils_update(
								editProjectModel,
								{
									updateForm: elm$core$Maybe$Just(newProject)
								}),
							model),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'InputUpdateProjectWorkDay':
				var string = msg.a;
				var _n6 = editProjectModel.updateForm;
				if (_n6.$ === 'Just') {
					var updateForm = _n6.a;
					var newProject = _Utils_update(
						updateForm,
						{
							workDayHours: A2(
								elm$core$Maybe$withDefault,
								0,
								elm$core$String$toInt(string))
						});
					return _Utils_Tuple2(
						A2(
							author$project$Page$Projects$EditProject$passToModel,
							_Utils_update(
								editProjectModel,
								{
									updateForm: elm$core$Maybe$Just(newProject)
								}),
							model),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'CancelEdit':
				var newEditProjectModel = _Utils_update(
					editProjectModel,
					{addMembers: _List_Nil, removeMembers: _List_Nil, updateForm: elm$core$Maybe$Nothing});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editProjectModel: newEditProjectModel}),
					author$project$Page$Projects$EditProject$redirectToProjectsPage(model));
			case 'AddMembers':
				var user = msg.a;
				var newEditProjectModel = function () {
					if (A2(elm$core$List$member, user, editProjectModel.removeMembers)) {
						var newRemoveMembers = A2(
							elm$core$List$filter,
							function (usr) {
								return !_Utils_eq(user, usr);
							},
							editProjectModel.removeMembers);
						return _Utils_update(
							editProjectModel,
							{removeMembers: newRemoveMembers});
					} else {
						var newAddMembers = A2(elm$core$List$cons, user, editProjectModel.addMembers);
						return _Utils_update(
							editProjectModel,
							{addMembers: newAddMembers});
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editProjectModel: newEditProjectModel}),
					elm$core$Platform$Cmd$none);
			case 'RemoveMembers':
				var user = msg.a;
				var newEditProjectModel = function () {
					if (A2(elm$core$List$member, user, editProjectModel.addMembers)) {
						var newAddMembers = A2(
							elm$core$List$filter,
							function (usr) {
								return !_Utils_eq(user, usr);
							},
							editProjectModel.addMembers);
						return _Utils_update(
							editProjectModel,
							{addMembers: newAddMembers});
					} else {
						return _Utils_update(
							editProjectModel,
							{
								removeMembers: A2(elm$core$List$cons, user, editProjectModel.removeMembers)
							});
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editProjectModel: newEditProjectModel}),
					elm$core$Platform$Cmd$none);
			case 'ReceiveDeleteProjectMutationResponse':
				if (msg.a.$ === 'Err') {
					var err = msg.a.a;
					var newProjectModel = _Utils_update(
						editProjectModel,
						{isPending: false, showModal: false});
					var newModel = _Utils_update(
						model,
						{
							errorMsg: elm$core$Maybe$Just(err)
						});
					return _Utils_Tuple2(
						A2(author$project$Page$Projects$EditProject$passToModel, newProjectModel, newModel),
						elm$core$Platform$Cmd$none);
				} else {
					var response = msg.a.a;
					var timelogs = A2(
						elm$core$Array$filter,
						function (x) {
							return !_Utils_eq(response.projectId, x.project.id);
						},
						timelogModel.timelogs);
					var projects = A2(
						elm$core$Array$filter,
						function (x) {
							return !_Utils_eq(response.projectId, x.id);
						},
						projectModel.projects);
					var newTimelogModel = _Utils_update(
						timelogModel,
						{timelogs: timelogs});
					var newProjectModel = _Utils_update(
						projectModel,
						{isPending: false, projects: projects});
					var newEditProjectModal = _Utils_update(
						editProjectModel,
						{showModal: false});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{editProjectModel: newEditProjectModal, projectModel: newProjectModel, timelogModel: newTimelogModel}),
						author$project$Page$Projects$EditProject$redirectToProjectsPage(model));
				}
			case 'DeleteProject':
				return _Utils_Tuple2(
					A2(
						author$project$Page$Projects$EditProject$passToModel,
						_Utils_update(
							editProjectModel,
							{showModal: true}),
						model),
					elm$core$Platform$Cmd$none);
			case 'SubmitDeleteProject':
				return _Utils_Tuple2(
					A2(
						author$project$Page$Projects$EditProject$passToModel,
						_Utils_update(
							editProjectModel,
							{isPending: true}),
						model),
					author$project$Page$Projects$EditProject$sendDeleteProjectMutation(model));
			default:
				return _Utils_Tuple2(
					A2(
						author$project$Page$Projects$EditProject$passToModel,
						_Utils_update(
							editProjectModel,
							{showModal: false}),
						model),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$DonutChart$update = F2(
	function (msg, model) {
		if (msg.$ === 'MouseOver') {
			var selected = msg.a;
			var newModel = _Utils_update(
				model,
				{
					selected: elm$core$Maybe$Just(selected)
				});
			return _Utils_Tuple2(newModel, elm$core$Platform$Cmd$none);
		} else {
			var newModel = _Utils_update(
				model,
				{selected: elm$core$Maybe$Nothing});
			return _Utils_Tuple2(newModel, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Page$Timelogs$DonutChartMsg = function (a) {
	return {$: 'DonutChartMsg', a: a};
};
var author$project$Page$Timelogs$getWorkDayHours = F2(
	function (user, project) {
		if (!project.workDayHours) {
			if (user.$ === 'Just') {
				var val = user.a;
				return val.account.globalWorkDayHours;
			} else {
				return 24;
			}
		} else {
			return project.workDayHours;
		}
	});
var author$project$Utils$TimeDelta$addCustomHours = F3(
	function (customDay, time1, time2) {
		var newTime = time1 + time2;
		return _Utils_Tuple2(newTime % customDay, (newTime / customDay) | 0);
	});
var author$project$Utils$TimeDelta$addTimes = F2(
	function (time1, time2) {
		var newTime = time1 + time2;
		return (newTime >= 60) ? _Utils_Tuple2(newTime - 60, 1) : _Utils_Tuple2(newTime, 0);
	});
var author$project$Utils$TimeDelta$customDaysAdd = F3(
	function (customDay, time1, time2) {
		var _n0 = A2(author$project$Utils$TimeDelta$addTimes, time1.seconds, time2.seconds);
		var seconds = _n0.a;
		var secondsExtra = _n0.b;
		var _n1 = A2(author$project$Utils$TimeDelta$addTimes, time1.minutes, time2.minutes + secondsExtra);
		var minutes = _n1.a;
		var minutesExtra = _n1.b;
		var _n2 = A3(author$project$Utils$TimeDelta$addCustomHours, customDay, time1.hours, time2.hours + minutesExtra);
		var hours = _n2.a;
		var hourExtra = _n2.b;
		var days = (time1.days + time2.days) + hourExtra;
		return A4(author$project$Utils$TimeDelta$TimeDelta, days, hours, minutes, seconds);
	});
var elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$List$sum = function (numbers) {
	return A3(elm$core$List$foldl, elm$core$Basics$add, 0, numbers);
};
var author$project$Page$Timelogs$projectTotals = F3(
	function (pointsList_, projectSet_, list) {
		projectTotals:
		while (true) {
			var _n0 = A2(
				elm$core$Maybe$withDefault,
				_Utils_Tuple2('unknown', '#333'),
				elm$core$List$head(projectSet_));
			var key = _n0.a;
			var color = _n0.b;
			var filtered = A2(
				elm$core$List$filter,
				function (point) {
					return _Utils_eq(point.key, key);
				},
				pointsList_);
			var filteredHead = A2(
				elm$core$Maybe$withDefault,
				{
					color: '#333',
					key: 'unknown',
					timeDelta: A4(author$project$Utils$TimeDelta$TimeDelta, 0, 0, 0, 0),
					value: 0,
					workDayHours: 0
				},
				elm$core$List$head(filtered));
			var timeTimeDeltas = A2(
				elm$core$List$map,
				function (point) {
					return point.timeDelta;
				},
				filtered);
			var totalTimeDelta = A3(
				elm$core$List$foldl,
				author$project$Utils$TimeDelta$customDaysAdd(filteredHead.workDayHours),
				A4(author$project$Utils$TimeDelta$TimeDelta, 0, 0, 0, 0),
				timeTimeDeltas);
			var times = A2(
				elm$core$List$map,
				function (point) {
					return point.value;
				},
				filtered);
			var total = elm$core$List$sum(times);
			var newList = (!elm$core$List$length(projectSet_)) ? list : A2(
				elm$core$List$cons,
				{color: color, display: totalTimeDelta, key: key, value: total},
				list);
			if (!elm$core$List$length(projectSet_)) {
				return newList;
			} else {
				var $temp$pointsList_ = pointsList_,
					$temp$projectSet_ = A2(elm$core$List$drop, 1, projectSet_),
					$temp$list = newList;
				pointsList_ = $temp$pointsList_;
				projectSet_ = $temp$projectSet_;
				list = $temp$list;
				continue projectTotals;
			}
		}
	});
var author$project$Utils$TimeDelta$toSeconds = function (timeDelta) {
	var minuteSeconds = timeDelta.minutes * 60;
	var hourSeconds = timeDelta.hours * 3600;
	var daySeconds = timeDelta.days * 86400;
	return ((timeDelta.seconds + minuteSeconds) + hourSeconds) + daySeconds;
};
var author$project$Utils$TimeDelta$toCustomDayFloat = F2(
	function (hoursInDay, timeDelta) {
		return author$project$Utils$TimeDelta$toSeconds(timeDelta) / (3600 * hoursInDay);
	});
var elm$core$Elm$JsArray$map = _JsArray_map;
var elm$core$Array$map = F2(
	function (func, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = function (node) {
			if (node.$ === 'SubTree') {
				var subTree = node.a;
				return elm$core$Array$SubTree(
					A2(elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return elm$core$Array$Leaf(
					A2(elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2(elm$core$Elm$JsArray$map, helper, tree),
			A2(elm$core$Elm$JsArray$map, func, tail));
	});
var elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var elm$core$Set$empty = elm$core$Set$Set_elm_builtin(elm$core$Dict$empty);
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return elm$core$Set$Set_elm_builtin(
			A3(elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var elm$core$Set$fromList = function (list) {
	return A3(elm$core$List$foldl, elm$core$Set$insert, elm$core$Set$empty, list);
};
var author$project$Page$Timelogs$donutChartPoints = F3(
	function (user, timelogs, projects) {
		var pointsList = elm$core$Array$toList(
			A2(
				elm$core$Array$map,
				function (timelog) {
					var projectFiltered = A2(
						elm$core$List$filter,
						function (x) {
							return _Utils_eq(x.id, timelog.project.id);
						},
						elm$core$Array$toList(projects));
					var project = A2(
						elm$core$Maybe$withDefault,
						A6(author$project$Types$Project$Project, timelog.project.id, '', '', '', '', 0),
						elm$core$List$head(projectFiltered));
					var workDayHours = A2(author$project$Page$Timelogs$getWorkDayHours, user, project);
					return {
						color: project.colour,
						key: project.name,
						timeDelta: timelog.duration,
						value: A2(author$project$Utils$TimeDelta$toCustomDayFloat, workDayHours, timelog.duration),
						workDayHours: workDayHours
					};
				},
				timelogs));
		var projectSet = elm$core$Set$toList(
			elm$core$Set$fromList(
				A2(
					elm$core$List$map,
					function (point) {
						return _Utils_Tuple2(point.key, point.color);
					},
					pointsList)));
		return A3(author$project$Page$Timelogs$projectTotals, pointsList, projectSet, _List_Nil);
	});
var author$project$Page$Timelogs$mergeProjectWithTimelog = F2(
	function (projects, timelog) {
		var projectFiltered = A2(
			elm$core$List$filter,
			function (x) {
				return _Utils_eq(x.id, timelog.project.id);
			},
			projects);
		var project = A2(
			elm$core$Maybe$withDefault,
			A6(author$project$Types$Project$Project, timelog.project.id, '', '', '', '', 0),
			elm$core$List$head(projectFiltered));
		return {date: timelog.date, description: timelog.description, duration: timelog.duration, id: timelog.id, project: project};
	});
var author$project$Page$Timelogs$passToModel = F2(
	function (timelogModel, model) {
		return _Utils_update(
			model,
			{timelogModel: timelogModel});
	});
var elm$core$String$cons = _String_cons;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3(elm$core$String$repeatHelp, n, chunk, '');
	});
var elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				elm$core$String$repeat,
				n - elm$core$String$length(string),
				elm$core$String$fromChar(_char)),
			string);
	});
var elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			elm$core$String$slice,
			-n,
			elm$core$String$length(string),
			string);
	});
var justinmimbs$date$Date$monthToNumber = function (m) {
	switch (m.$) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
var justinmimbs$date$Date$toCalendarDateHelp = F3(
	function (y, m, d) {
		toCalendarDateHelp:
		while (true) {
			var monthDays = A2(justinmimbs$date$Date$daysInMonth, y, m);
			var mn = justinmimbs$date$Date$monthToNumber(m);
			if ((mn < 12) && (_Utils_cmp(d, monthDays) > 0)) {
				var $temp$y = y,
					$temp$m = justinmimbs$date$Date$numberToMonth(mn + 1),
					$temp$d = d - monthDays;
				y = $temp$y;
				m = $temp$m;
				d = $temp$d;
				continue toCalendarDateHelp;
			} else {
				return {day: d, month: m, year: y};
			}
		}
	});
var justinmimbs$date$Date$divWithRemainder = F2(
	function (a, b) {
		return _Utils_Tuple2(
			A2(justinmimbs$date$Date$floorDiv, a, b),
			A2(elm$core$Basics$modBy, b, a));
	});
var justinmimbs$date$Date$year = function (_n0) {
	var rd = _n0.a;
	var _n1 = A2(justinmimbs$date$Date$divWithRemainder, rd, 146097);
	var n400 = _n1.a;
	var r400 = _n1.b;
	var _n2 = A2(justinmimbs$date$Date$divWithRemainder, r400, 36524);
	var n100 = _n2.a;
	var r100 = _n2.b;
	var _n3 = A2(justinmimbs$date$Date$divWithRemainder, r100, 1461);
	var n4 = _n3.a;
	var r4 = _n3.b;
	var _n4 = A2(justinmimbs$date$Date$divWithRemainder, r4, 365);
	var n1 = _n4.a;
	var r1 = _n4.b;
	var n = (!r1) ? 0 : 1;
	return ((((n400 * 400) + (n100 * 100)) + (n4 * 4)) + n1) + n;
};
var justinmimbs$date$Date$toOrdinalDate = function (_n0) {
	var rd = _n0.a;
	var y = justinmimbs$date$Date$year(
		justinmimbs$date$Date$RD(rd));
	return {
		ordinalDay: rd - justinmimbs$date$Date$daysBeforeYear(y),
		year: y
	};
};
var justinmimbs$date$Date$toCalendarDate = function (_n0) {
	var rd = _n0.a;
	var date = justinmimbs$date$Date$toOrdinalDate(
		justinmimbs$date$Date$RD(rd));
	return A3(justinmimbs$date$Date$toCalendarDateHelp, date.year, elm$time$Time$Jan, date.ordinalDay);
};
var justinmimbs$date$Date$day = A2(
	elm$core$Basics$composeR,
	justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.day;
	});
var justinmimbs$date$Date$month = A2(
	elm$core$Basics$composeR,
	justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.month;
	});
var justinmimbs$date$Date$monthNumber = A2(elm$core$Basics$composeR, justinmimbs$date$Date$month, justinmimbs$date$Date$monthToNumber);
var justinmimbs$date$Date$ordinalDay = A2(
	elm$core$Basics$composeR,
	justinmimbs$date$Date$toOrdinalDate,
	function ($) {
		return $.ordinalDay;
	});
var elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var justinmimbs$date$Date$padSignedInt = F2(
	function (length, _int) {
		return _Utils_ap(
			(_int < 0) ? '-' : '',
			A3(
				elm$core$String$padLeft,
				length,
				_Utils_chr('0'),
				elm$core$String$fromInt(
					elm$core$Basics$abs(_int))));
	});
var justinmimbs$date$Date$monthToQuarter = function (m) {
	return ((justinmimbs$date$Date$monthToNumber(m) + 2) / 3) | 0;
};
var justinmimbs$date$Date$quarter = A2(elm$core$Basics$composeR, justinmimbs$date$Date$month, justinmimbs$date$Date$monthToQuarter);
var elm$time$Time$Fri = {$: 'Fri'};
var elm$time$Time$Mon = {$: 'Mon'};
var elm$time$Time$Sat = {$: 'Sat'};
var elm$time$Time$Sun = {$: 'Sun'};
var elm$time$Time$Thu = {$: 'Thu'};
var elm$time$Time$Tue = {$: 'Tue'};
var elm$time$Time$Wed = {$: 'Wed'};
var justinmimbs$date$Date$numberToWeekday = function (wdn) {
	var _n0 = A2(elm$core$Basics$max, 1, wdn);
	switch (_n0) {
		case 1:
			return elm$time$Time$Mon;
		case 2:
			return elm$time$Time$Tue;
		case 3:
			return elm$time$Time$Wed;
		case 4:
			return elm$time$Time$Thu;
		case 5:
			return elm$time$Time$Fri;
		case 6:
			return elm$time$Time$Sat;
		default:
			return elm$time$Time$Sun;
	}
};
var justinmimbs$date$Date$toWeekDate = function (_n0) {
	var rd = _n0.a;
	var wdn = justinmimbs$date$Date$weekdayNumber(
		justinmimbs$date$Date$RD(rd));
	var wy = justinmimbs$date$Date$year(
		justinmimbs$date$Date$RD(rd + (4 - wdn)));
	var week1Day1 = justinmimbs$date$Date$daysBeforeWeekYear(wy) + 1;
	return {
		weekNumber: 1 + (((rd - week1Day1) / 7) | 0),
		weekYear: wy,
		weekday: justinmimbs$date$Date$numberToWeekday(wdn)
	};
};
var justinmimbs$date$Date$weekNumber = A2(
	elm$core$Basics$composeR,
	justinmimbs$date$Date$toWeekDate,
	function ($) {
		return $.weekNumber;
	});
var justinmimbs$date$Date$weekYear = A2(
	elm$core$Basics$composeR,
	justinmimbs$date$Date$toWeekDate,
	function ($) {
		return $.weekYear;
	});
var justinmimbs$date$Date$weekday = A2(elm$core$Basics$composeR, justinmimbs$date$Date$weekdayNumber, justinmimbs$date$Date$numberToWeekday);
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var justinmimbs$date$Date$ordinalSuffix = function (n) {
	var nn = A2(elm$core$Basics$modBy, 100, n);
	var _n0 = A2(
		elm$core$Basics$min,
		(nn < 20) ? nn : A2(elm$core$Basics$modBy, 10, nn),
		4);
	switch (_n0) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
};
var justinmimbs$date$Date$withOrdinalSuffix = function (n) {
	return _Utils_ap(
		elm$core$String$fromInt(n),
		justinmimbs$date$Date$ordinalSuffix(n));
};
var justinmimbs$date$Date$formatField = F4(
	function (language, _char, length, date) {
		switch (_char.valueOf()) {
			case 'y':
				if (length === 2) {
					return A2(
						elm$core$String$right,
						2,
						A3(
							elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							elm$core$String$fromInt(
								justinmimbs$date$Date$year(date))));
				} else {
					return A2(
						justinmimbs$date$Date$padSignedInt,
						length,
						justinmimbs$date$Date$year(date));
				}
			case 'Y':
				if (length === 2) {
					return A2(
						elm$core$String$right,
						2,
						A3(
							elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							elm$core$String$fromInt(
								justinmimbs$date$Date$weekYear(date))));
				} else {
					return A2(
						justinmimbs$date$Date$padSignedInt,
						length,
						justinmimbs$date$Date$weekYear(date));
				}
			case 'Q':
				switch (length) {
					case 1:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$quarter(date));
					case 2:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$quarter(date));
					case 3:
						return 'Q' + elm$core$String$fromInt(
							justinmimbs$date$Date$quarter(date));
					case 4:
						return justinmimbs$date$Date$withOrdinalSuffix(
							justinmimbs$date$Date$quarter(date));
					case 5:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$quarter(date));
					default:
						return '';
				}
			case 'M':
				switch (length) {
					case 1:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$monthNumber(date));
					case 2:
						return A3(
							elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							elm$core$String$fromInt(
								justinmimbs$date$Date$monthNumber(date)));
					case 3:
						return language.monthNameShort(
							justinmimbs$date$Date$month(date));
					case 4:
						return language.monthName(
							justinmimbs$date$Date$month(date));
					case 5:
						return A2(
							elm$core$String$left,
							1,
							language.monthNameShort(
								justinmimbs$date$Date$month(date)));
					default:
						return '';
				}
			case 'w':
				switch (length) {
					case 1:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$weekNumber(date));
					case 2:
						return A3(
							elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							elm$core$String$fromInt(
								justinmimbs$date$Date$weekNumber(date)));
					default:
						return '';
				}
			case 'd':
				switch (length) {
					case 1:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$day(date));
					case 2:
						return A3(
							elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							elm$core$String$fromInt(
								justinmimbs$date$Date$day(date)));
					case 3:
						return language.dayWithSuffix(
							justinmimbs$date$Date$day(date));
					default:
						return '';
				}
			case 'D':
				switch (length) {
					case 1:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$ordinalDay(date));
					case 2:
						return A3(
							elm$core$String$padLeft,
							2,
							_Utils_chr('0'),
							elm$core$String$fromInt(
								justinmimbs$date$Date$ordinalDay(date)));
					case 3:
						return A3(
							elm$core$String$padLeft,
							3,
							_Utils_chr('0'),
							elm$core$String$fromInt(
								justinmimbs$date$Date$ordinalDay(date)));
					default:
						return '';
				}
			case 'E':
				switch (length) {
					case 1:
						return language.weekdayNameShort(
							justinmimbs$date$Date$weekday(date));
					case 2:
						return language.weekdayNameShort(
							justinmimbs$date$Date$weekday(date));
					case 3:
						return language.weekdayNameShort(
							justinmimbs$date$Date$weekday(date));
					case 4:
						return language.weekdayName(
							justinmimbs$date$Date$weekday(date));
					case 5:
						return A2(
							elm$core$String$left,
							1,
							language.weekdayNameShort(
								justinmimbs$date$Date$weekday(date)));
					case 6:
						return A2(
							elm$core$String$left,
							2,
							language.weekdayNameShort(
								justinmimbs$date$Date$weekday(date)));
					default:
						return '';
				}
			case 'e':
				switch (length) {
					case 1:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$weekdayNumber(date));
					case 2:
						return elm$core$String$fromInt(
							justinmimbs$date$Date$weekdayNumber(date));
					default:
						return A4(
							justinmimbs$date$Date$formatField,
							language,
							_Utils_chr('E'),
							length,
							date);
				}
			default:
				return '';
		}
	});
var justinmimbs$date$Date$formatWithTokens = F3(
	function (language, tokens, date) {
		return A3(
			elm$core$List$foldl,
			F2(
				function (token, formatted) {
					if (token.$ === 'Field') {
						var _char = token.a;
						var length = token.b;
						return _Utils_ap(
							A4(justinmimbs$date$Date$formatField, language, _char, length, date),
							formatted);
					} else {
						var str = token.a;
						return _Utils_ap(str, formatted);
					}
				}),
			'',
			tokens);
	});
var justinmimbs$date$Pattern$Literal = function (a) {
	return {$: 'Literal', a: a};
};
var elm$parser$Parser$Advanced$lazy = function (thunk) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _n0 = thunk(_Utils_Tuple0);
			var parse = _n0.a;
			return parse(s);
		});
};
var elm$parser$Parser$lazy = elm$parser$Parser$Advanced$lazy;
var justinmimbs$date$Pattern$escapedQuote = A2(
	elm$parser$Parser$ignorer,
	elm$parser$Parser$succeed(
		justinmimbs$date$Pattern$Literal('\'')),
	elm$parser$Parser$token('\'\''));
var elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2(elm$parser$Parser$Advanced$mapChompedString, elm$core$Basics$always, parser);
};
var elm$parser$Parser$getChompedString = elm$parser$Parser$Advanced$getChompedString;
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var elm$parser$Parser$chompWhile = elm$parser$Parser$Advanced$chompWhile;
var elm$parser$Parser$Advanced$getOffset = elm$parser$Parser$Advanced$Parser(
	function (s) {
		return A3(elm$parser$Parser$Advanced$Good, false, s.offset, s);
	});
var elm$parser$Parser$getOffset = elm$parser$Parser$Advanced$getOffset;
var justinmimbs$date$Pattern$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var justinmimbs$date$Pattern$fieldRepeats = function (str) {
	var _n0 = elm$core$String$toList(str);
	if (_n0.b && (!_n0.b.b)) {
		var _char = _n0.a;
		return A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				elm$parser$Parser$succeed(
					F2(
						function (x, y) {
							return A2(justinmimbs$date$Pattern$Field, _char, 1 + (y - x));
						})),
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$getOffset,
					elm$parser$Parser$chompWhile(
						elm$core$Basics$eq(_char)))),
			elm$parser$Parser$getOffset);
	} else {
		return elm$parser$Parser$problem('expected exactly one char');
	}
};
var justinmimbs$date$Pattern$field = A2(
	elm$parser$Parser$andThen,
	justinmimbs$date$Pattern$fieldRepeats,
	elm$parser$Parser$getChompedString(
		elm$parser$Parser$chompIf(elm$core$Char$isAlpha)));
var justinmimbs$date$Pattern$finalize = A2(
	elm$core$List$foldl,
	F2(
		function (token, tokens) {
			var _n0 = _Utils_Tuple2(token, tokens);
			if (((_n0.a.$ === 'Literal') && _n0.b.b) && (_n0.b.a.$ === 'Literal')) {
				var x = _n0.a.a;
				var _n1 = _n0.b;
				var y = _n1.a.a;
				var rest = _n1.b;
				return A2(
					elm$core$List$cons,
					justinmimbs$date$Pattern$Literal(
						_Utils_ap(x, y)),
					rest);
			} else {
				return A2(elm$core$List$cons, token, tokens);
			}
		}),
	_List_Nil);
var justinmimbs$date$Pattern$isLiteralChar = function (_char) {
	return (!_Utils_eq(
		_char,
		_Utils_chr('\''))) && (!elm$core$Char$isAlpha(_char));
};
var justinmimbs$date$Pattern$literal = A2(
	elm$parser$Parser$map,
	justinmimbs$date$Pattern$Literal,
	elm$parser$Parser$getChompedString(
		A2(
			elm$parser$Parser$ignorer,
			A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$succeed(_Utils_Tuple0),
				elm$parser$Parser$chompIf(justinmimbs$date$Pattern$isLiteralChar)),
			elm$parser$Parser$chompWhile(justinmimbs$date$Pattern$isLiteralChar))));
var justinmimbs$date$Pattern$quotedHelp = function (result) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$andThen,
				function (str) {
					return justinmimbs$date$Pattern$quotedHelp(
						_Utils_ap(result, str));
				},
				elm$parser$Parser$getChompedString(
					A2(
						elm$parser$Parser$ignorer,
						A2(
							elm$parser$Parser$ignorer,
							elm$parser$Parser$succeed(_Utils_Tuple0),
							elm$parser$Parser$chompIf(
								elm$core$Basics$neq(
									_Utils_chr('\'')))),
						elm$parser$Parser$chompWhile(
							elm$core$Basics$neq(
								_Utils_chr('\'')))))),
				A2(
				elm$parser$Parser$andThen,
				function (_n0) {
					return justinmimbs$date$Pattern$quotedHelp(result + '\'');
				},
				elm$parser$Parser$token('\'\'')),
				elm$parser$Parser$succeed(result)
			]));
};
var justinmimbs$date$Pattern$quoted = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$ignorer,
		elm$parser$Parser$succeed(justinmimbs$date$Pattern$Literal),
		elm$parser$Parser$chompIf(
			elm$core$Basics$eq(
				_Utils_chr('\'')))),
	A2(
		elm$parser$Parser$ignorer,
		justinmimbs$date$Pattern$quotedHelp(''),
		elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					elm$parser$Parser$chompIf(
					elm$core$Basics$eq(
						_Utils_chr('\''))),
					elm$parser$Parser$end
				]))));
var justinmimbs$date$Pattern$patternHelp = function (tokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$andThen,
				function (token) {
					return justinmimbs$date$Pattern$patternHelp(
						A2(elm$core$List$cons, token, tokens));
				},
				elm$parser$Parser$oneOf(
					_List_fromArray(
						[justinmimbs$date$Pattern$field, justinmimbs$date$Pattern$literal, justinmimbs$date$Pattern$escapedQuote, justinmimbs$date$Pattern$quoted]))),
				elm$parser$Parser$lazy(
				function (_n0) {
					return elm$parser$Parser$succeed(
						justinmimbs$date$Pattern$finalize(tokens));
				})
			]));
};
var justinmimbs$date$Pattern$fromString = function (str) {
	return A2(
		elm$core$Result$withDefault,
		_List_fromArray(
			[
				justinmimbs$date$Pattern$Literal(str)
			]),
		A2(
			elm$parser$Parser$run,
			justinmimbs$date$Pattern$patternHelp(_List_Nil),
			str));
};
var justinmimbs$date$Date$formatWithLanguage = F2(
	function (language, pattern) {
		var tokens = elm$core$List$reverse(
			justinmimbs$date$Pattern$fromString(pattern));
		return A2(justinmimbs$date$Date$formatWithTokens, language, tokens);
	});
var justinmimbs$date$Date$monthToName = function (m) {
	switch (m.$) {
		case 'Jan':
			return 'January';
		case 'Feb':
			return 'February';
		case 'Mar':
			return 'March';
		case 'Apr':
			return 'April';
		case 'May':
			return 'May';
		case 'Jun':
			return 'June';
		case 'Jul':
			return 'July';
		case 'Aug':
			return 'August';
		case 'Sep':
			return 'September';
		case 'Oct':
			return 'October';
		case 'Nov':
			return 'November';
		default:
			return 'December';
	}
};
var justinmimbs$date$Date$weekdayToName = function (wd) {
	switch (wd.$) {
		case 'Mon':
			return 'Monday';
		case 'Tue':
			return 'Tuesday';
		case 'Wed':
			return 'Wednesday';
		case 'Thu':
			return 'Thursday';
		case 'Fri':
			return 'Friday';
		case 'Sat':
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var justinmimbs$date$Date$language_en = {
	dayWithSuffix: justinmimbs$date$Date$withOrdinalSuffix,
	monthName: justinmimbs$date$Date$monthToName,
	monthNameShort: A2(
		elm$core$Basics$composeR,
		justinmimbs$date$Date$monthToName,
		elm$core$String$left(3)),
	weekdayName: justinmimbs$date$Date$weekdayToName,
	weekdayNameShort: A2(
		elm$core$Basics$composeR,
		justinmimbs$date$Date$weekdayToName,
		elm$core$String$left(3))
};
var justinmimbs$date$Date$format = function (pattern) {
	return A2(justinmimbs$date$Date$formatWithLanguage, justinmimbs$date$Date$language_en, pattern);
};
var justinmimbs$date$Date$toIsoString = justinmimbs$date$Date$format('yyyy-MM-dd');
var author$project$Api$dateVar = A2(
	jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$enum,
	'Date',
	function (x) {
		return justinmimbs$date$Date$toIsoString(x);
	});
var author$project$Types$Timelog$TimelogsRequest = function (allTimelogs) {
	return {allTimelogs: allTimelogs};
};
var author$project$Api$Timelog$timelogsRangeQuery = F2(
	function (rangeStart, rangeEnd) {
		var rangeStartVar = A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
			'rangeStart',
			function ($) {
				return $.rangeStart;
			},
			author$project$Api$dateVar);
		var rangeEndVar = A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
			'rangeEnd',
			function ($) {
				return $.rangeEnd;
			},
			author$project$Api$dateVar);
		var queryRoot = A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'timelogsByRange',
				_List_fromArray(
					[
						_Utils_Tuple2(
						'start',
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(rangeStartVar)),
						_Utils_Tuple2(
						'end',
						jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(rangeEndVar))
					]),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$Api$Timelog$timelogObject)),
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$Timelog$TimelogsRequest));
		return A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
			{rangeEnd: rangeEnd, rangeStart: rangeStart},
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot));
	});
var justinmimbs$date$Date$Days = {$: 'Days'};
var justinmimbs$date$Date$Month = {$: 'Month'};
var justinmimbs$date$Date$Months = {$: 'Months'};
var justinmimbs$date$Date$Saturday = {$: 'Saturday'};
var justinmimbs$date$Date$Sunday = {$: 'Sunday'};
var justinmimbs$date$Date$add = F3(
	function (unit, n, _n0) {
		var rd = _n0.a;
		switch (unit.$) {
			case 'Years':
				return A3(
					justinmimbs$date$Date$add,
					justinmimbs$date$Date$Months,
					12 * n,
					justinmimbs$date$Date$RD(rd));
			case 'Months':
				var date = justinmimbs$date$Date$toCalendarDate(
					justinmimbs$date$Date$RD(rd));
				var wholeMonths = ((12 * (date.year - 1)) + (justinmimbs$date$Date$monthToNumber(date.month) - 1)) + n;
				var m = justinmimbs$date$Date$numberToMonth(
					A2(elm$core$Basics$modBy, 12, wholeMonths) + 1);
				var y = A2(justinmimbs$date$Date$floorDiv, wholeMonths, 12) + 1;
				return justinmimbs$date$Date$RD(
					(justinmimbs$date$Date$daysBeforeYear(y) + A2(justinmimbs$date$Date$daysBeforeMonth, y, m)) + A2(
						elm$core$Basics$min,
						date.day,
						A2(justinmimbs$date$Date$daysInMonth, y, m)));
			case 'Weeks':
				return justinmimbs$date$Date$RD(rd + (7 * n));
			default:
				return justinmimbs$date$Date$RD(rd + n);
		}
	});
var justinmimbs$date$Date$weekdayToNumber = function (wd) {
	switch (wd.$) {
		case 'Mon':
			return 1;
		case 'Tue':
			return 2;
		case 'Wed':
			return 3;
		case 'Thu':
			return 4;
		case 'Fri':
			return 5;
		case 'Sat':
			return 6;
		default:
			return 7;
	}
};
var justinmimbs$date$Date$daysSincePreviousWeekday = F2(
	function (wd, date) {
		return A2(
			elm$core$Basics$modBy,
			7,
			(justinmimbs$date$Date$weekdayNumber(date) + 7) - justinmimbs$date$Date$weekdayToNumber(wd));
	});
var justinmimbs$date$Date$firstOfMonth = F2(
	function (y, m) {
		return justinmimbs$date$Date$RD(
			(justinmimbs$date$Date$daysBeforeYear(y) + A2(justinmimbs$date$Date$daysBeforeMonth, y, m)) + 1);
	});
var justinmimbs$date$Date$quarterToMonth = function (q) {
	return justinmimbs$date$Date$numberToMonth((q * 3) - 2);
};
var justinmimbs$date$Date$floor = F2(
	function (interval, date) {
		var rd = date.a;
		switch (interval.$) {
			case 'Year':
				return justinmimbs$date$Date$firstOfYear(
					justinmimbs$date$Date$year(date));
			case 'Quarter':
				return A2(
					justinmimbs$date$Date$firstOfMonth,
					justinmimbs$date$Date$year(date),
					justinmimbs$date$Date$quarterToMonth(
						justinmimbs$date$Date$quarter(date)));
			case 'Month':
				return A2(
					justinmimbs$date$Date$firstOfMonth,
					justinmimbs$date$Date$year(date),
					justinmimbs$date$Date$month(date));
			case 'Week':
				return justinmimbs$date$Date$RD(
					rd - A2(justinmimbs$date$Date$daysSincePreviousWeekday, elm$time$Time$Mon, date));
			case 'Monday':
				return justinmimbs$date$Date$RD(
					rd - A2(justinmimbs$date$Date$daysSincePreviousWeekday, elm$time$Time$Mon, date));
			case 'Tuesday':
				return justinmimbs$date$Date$RD(
					rd - A2(justinmimbs$date$Date$daysSincePreviousWeekday, elm$time$Time$Tue, date));
			case 'Wednesday':
				return justinmimbs$date$Date$RD(
					rd - A2(justinmimbs$date$Date$daysSincePreviousWeekday, elm$time$Time$Wed, date));
			case 'Thursday':
				return justinmimbs$date$Date$RD(
					rd - A2(justinmimbs$date$Date$daysSincePreviousWeekday, elm$time$Time$Thu, date));
			case 'Friday':
				return justinmimbs$date$Date$RD(
					rd - A2(justinmimbs$date$Date$daysSincePreviousWeekday, elm$time$Time$Fri, date));
			case 'Saturday':
				return justinmimbs$date$Date$RD(
					rd - A2(justinmimbs$date$Date$daysSincePreviousWeekday, elm$time$Time$Sat, date));
			case 'Sunday':
				return justinmimbs$date$Date$RD(
					rd - A2(justinmimbs$date$Date$daysSincePreviousWeekday, elm$time$Time$Sun, date));
			default:
				return date;
		}
	});
var justinmimbs$date$Date$Weeks = {$: 'Weeks'};
var justinmimbs$date$Date$Years = {$: 'Years'};
var justinmimbs$date$Date$intervalToUnits = function (interval) {
	switch (interval.$) {
		case 'Year':
			return _Utils_Tuple2(1, justinmimbs$date$Date$Years);
		case 'Quarter':
			return _Utils_Tuple2(3, justinmimbs$date$Date$Months);
		case 'Month':
			return _Utils_Tuple2(1, justinmimbs$date$Date$Months);
		case 'Day':
			return _Utils_Tuple2(1, justinmimbs$date$Date$Days);
		default:
			var week = interval;
			return _Utils_Tuple2(1, justinmimbs$date$Date$Weeks);
	}
};
var justinmimbs$date$Date$ceiling = F2(
	function (interval, date) {
		var floored = A2(justinmimbs$date$Date$floor, interval, date);
		if (_Utils_eq(date, floored)) {
			return date;
		} else {
			var _n0 = justinmimbs$date$Date$intervalToUnits(interval);
			var n = _n0.a;
			var unit = _n0.b;
			return A3(justinmimbs$date$Date$add, unit, n, floored);
		}
	});
var author$project$Page$rangeFromDate = F2(
	function (date, filterView) {
		var start = function () {
			if (filterView.$ === 'WeekView') {
				return A2(justinmimbs$date$Date$floor, justinmimbs$date$Date$Sunday, date);
			} else {
				return A2(justinmimbs$date$Date$floor, justinmimbs$date$Date$Month, date);
			}
		}();
		var end = function () {
			if (filterView.$ === 'WeekView') {
				return A2(justinmimbs$date$Date$ceiling, justinmimbs$date$Date$Saturday, date);
			} else {
				var month = A2(
					justinmimbs$date$Date$floor,
					justinmimbs$date$Date$Month,
					A3(justinmimbs$date$Date$add, justinmimbs$date$Date$Months, 1, date));
				return A3(justinmimbs$date$Date$add, justinmimbs$date$Date$Days, -1, month);
			}
		}();
		return _Utils_Tuple2(start, end);
	});
var author$project$Page$Timelogs$ReceiveTimelogQueryResponse = function (a) {
	return {$: 'ReceiveTimelogQueryResponse', a: a};
};
var author$project$Page$Timelogs$sendTimeLogsQuery = F3(
	function (csrf, date, filterView) {
		var _n0 = A2(author$project$Page$rangeFromDate, date, filterView);
		var start = _n0.a;
		var end = _n0.b;
		return A2(
			elm$core$Task$attempt,
			author$project$Page$Timelogs$ReceiveTimelogQueryResponse,
			A2(
				author$project$Api$sendQueryRequest,
				csrf,
				A2(author$project$Api$Timelog$timelogsRangeQuery, start, end)));
	});
var author$project$Types$Timelog$TimelogsWithProjectsRequest = F2(
	function (allTimelogs, allProjects) {
		return {allProjects: allProjects, allTimelogs: allTimelogs};
	});
var author$project$Api$Timelog$timelogsRangeWithProjectsQuery = F2(
	function (rangeStart, rangeEnd) {
		var rangeStartVar = A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
			'rangeStart',
			function ($) {
				return $.rangeStart;
			},
			author$project$Api$dateVar);
		var rangeEndVar = A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
			'rangeEnd',
			function ($) {
				return $.rangeEnd;
			},
			author$project$Api$dateVar);
		var queryRoot = A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
			A3(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
				'allProjects',
				_List_Nil,
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$Api$Project$projectsObject)),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
					'timelogsByRange',
					_List_fromArray(
						[
							_Utils_Tuple2(
							'start',
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(rangeStartVar)),
							_Utils_Tuple2(
							'end',
							jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(rangeEndVar))
						]),
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$list(author$project$Api$Timelog$timelogObject)),
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$Timelog$TimelogsWithProjectsRequest)));
		return A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
			{rangeEnd: rangeEnd, rangeStart: rangeStart},
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$queryDocument(queryRoot));
	});
var author$project$Page$Timelogs$ReceiveTimelogsWithProjectsResponse = function (a) {
	return {$: 'ReceiveTimelogsWithProjectsResponse', a: a};
};
var author$project$Page$Timelogs$sendTimeLogsWithProjectsQuery = F3(
	function (csrf, date, filterView) {
		var _n0 = A2(author$project$Page$rangeFromDate, date, filterView);
		var start = _n0.a;
		var end = _n0.b;
		return A2(
			elm$core$Task$attempt,
			author$project$Page$Timelogs$ReceiveTimelogsWithProjectsResponse,
			A2(
				author$project$Api$sendQueryRequest,
				csrf,
				A2(author$project$Api$Timelog$timelogsRangeWithProjectsQuery, start, end)));
	});
var author$project$Page$Timelogs$updateDate = F3(
	function (unit, value, model) {
		var timelogModel = model.timelogModel;
		var date = A3(justinmimbs$date$Date$add, unit, value, timelogModel.filterDate);
		return _Utils_Tuple2(
			A2(
				author$project$Page$Timelogs$passToModel,
				_Utils_update(
					timelogModel,
					{filterDate: date}),
				model),
			A3(author$project$Page$Timelogs$sendTimeLogsQuery, model.flags.csrftoken, date, timelogModel.filterView));
	});
var author$project$Types$Timelog$MonthView = {$: 'MonthView'};
var elm$core$Array$foldl = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldl,
			func,
			A3(elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var elm$core$Result$toMaybe = function (result) {
	if (result.$ === 'Ok') {
		var v = result.a;
		return elm$core$Maybe$Just(v);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Page$Timelogs$update = F2(
	function (msg, model) {
		var timelogModel = model.timelogModel;
		var projectModel = model.projectModel;
		switch (msg.$) {
			case 'ReceiveDate':
				var today = msg.a;
				var newTimelogModel = _Utils_update(
					timelogModel,
					{filterDate: today});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{timelogModel: newTimelogModel, today: today}),
					projectModel.readyProjects ? A3(author$project$Page$Timelogs$sendTimeLogsQuery, model.flags.csrftoken, today, timelogModel.filterView) : A3(author$project$Page$Timelogs$sendTimeLogsWithProjectsQuery, model.flags.csrftoken, today, timelogModel.filterView));
			case 'ReceiveTimelogQueryResponse':
				if (msg.a.$ === 'Err') {
					var err = msg.a.a;
					var newTimelogModel = _Utils_update(
						timelogModel,
						{isPending: false});
					var newModel = _Utils_update(
						model,
						{
							errorMsg: elm$core$Maybe$Just(err)
						});
					return _Utils_Tuple2(
						A2(author$project$Page$Timelogs$passToModel, newTimelogModel, newModel),
						elm$core$Platform$Cmd$none);
				} else {
					var response = msg.a.a;
					var newTimelogs = elm$core$Array$fromList(response.allTimelogs);
					var donutChartList = A3(author$project$Page$Timelogs$donutChartPoints, model.profileModel.user, newTimelogs, projectModel.projects);
					var donutChartData = timelogModel.donutChartData;
					var curriedMerged = author$project$Page$Timelogs$mergeProjectWithTimelog(
						elm$core$Array$toList(projectModel.projects));
					var timelogswithProjects = A2(elm$core$Array$map, curriedMerged, newTimelogs);
					var totalTimeDelta = A3(
						elm$core$Array$foldl,
						function (_n1) {
							var duration = _n1.a;
							var hours = _n1.b;
							return A2(author$project$Utils$TimeDelta$customDaysAdd, hours, duration);
						},
						A4(author$project$Utils$TimeDelta$TimeDelta, 0, 0, 0, 0),
						A2(
							elm$core$Array$map,
							function (x) {
								return _Utils_Tuple2(
									x.duration,
									A2(author$project$Page$Timelogs$getWorkDayHours, model.profileModel.user, x.project));
							},
							timelogswithProjects));
					var newDonutChartModel = _Utils_update(
						donutChartData,
						{displayTotal: totalTimeDelta, points: donutChartList});
					var newTimelogModel = _Utils_update(
						timelogModel,
						{donutChartData: newDonutChartModel, isPending: false, readyTimes: true, timelogs: newTimelogs});
					return _Utils_Tuple2(
						A2(author$project$Page$Timelogs$passToModel, newTimelogModel, model),
						elm$core$Platform$Cmd$none);
				}
			case 'ReceiveTimelogsWithProjectsResponse':
				if (msg.a.$ === 'Err') {
					var err = msg.a.a;
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				} else {
					var response = msg.a.a;
					var newTimelogs = elm$core$Array$fromList(response.allTimelogs);
					var newProjects = elm$core$Array$fromList(response.allProjects);
					var newProjectModel = _Utils_update(
						projectModel,
						{projects: newProjects, readyProjects: true});
					var donutChartList = A3(author$project$Page$Timelogs$donutChartPoints, model.profileModel.user, newTimelogs, newProjects);
					var donutChartData = timelogModel.donutChartData;
					var curriedMerged = author$project$Page$Timelogs$mergeProjectWithTimelog(
						elm$core$Array$toList(projectModel.projects));
					var timelogswithProjects = A2(elm$core$Array$map, curriedMerged, newTimelogs);
					var totalTimeDelta = A3(
						elm$core$Array$foldl,
						function (_n2) {
							var duration = _n2.a;
							var hours = _n2.b;
							return A2(author$project$Utils$TimeDelta$customDaysAdd, hours, duration);
						},
						A4(author$project$Utils$TimeDelta$TimeDelta, 0, 0, 0, 0),
						A2(
							elm$core$Array$map,
							function (x) {
								return _Utils_Tuple2(
									x.duration,
									A2(author$project$Page$Timelogs$getWorkDayHours, model.profileModel.user, x.project));
							},
							timelogswithProjects));
					var newDonutChartModel = _Utils_update(
						donutChartData,
						{displayTotal: totalTimeDelta, points: donutChartList});
					var newTimelogModel = _Utils_update(
						timelogModel,
						{donutChartData: newDonutChartModel, isPending: false, readyTimes: true, timelogs: newTimelogs});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{projectModel: newProjectModel, timelogModel: newTimelogModel}),
						elm$core$Platform$Cmd$none);
				}
			case 'ChangeView':
				var filterViewString = msg.a;
				var filterView = (filterViewString === 'week') ? author$project$Types$Timelog$WeekView : author$project$Types$Timelog$MonthView;
				return _Utils_Tuple2(
					A2(
						author$project$Page$Timelogs$passToModel,
						_Utils_update(
							timelogModel,
							{filterView: filterView}),
						model),
					A3(author$project$Page$Timelogs$sendTimeLogsQuery, model.flags.csrftoken, timelogModel.filterDate, filterView));
			case 'SetDate':
				var dateString = msg.a;
				var date = elm$core$Result$toMaybe(
					justinmimbs$date$Date$fromIsoString(dateString));
				var newDate = function () {
					if (date.$ === 'Just') {
						var val = date.a;
						return val;
					} else {
						return timelogModel.filterDate;
					}
				}();
				return _Utils_Tuple2(
					A2(
						author$project$Page$Timelogs$passToModel,
						_Utils_update(
							timelogModel,
							{filterDate: newDate}),
						model),
					A3(author$project$Page$Timelogs$sendTimeLogsQuery, model.flags.csrftoken, newDate, timelogModel.filterView));
			case 'PreviousWeek':
				return A3(author$project$Page$Timelogs$updateDate, justinmimbs$date$Date$Days, -7, model);
			case 'NextWeek':
				return A3(author$project$Page$Timelogs$updateDate, justinmimbs$date$Date$Days, 7, model);
			case 'PreviousMonth':
				return A3(author$project$Page$Timelogs$updateDate, justinmimbs$date$Date$Months, -1, model);
			case 'NextMonth':
				return A3(author$project$Page$Timelogs$updateDate, justinmimbs$date$Date$Months, 1, model);
			default:
				var donutChartMsg = msg.a;
				return function (_n4) {
					var data = _n4.a;
					var cmd = _n4.b;
					var newTimelogModel = _Utils_update(
						timelogModel,
						{donutChartData: data});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{timelogModel: newTimelogModel}),
						A2(elm$core$Platform$Cmd$map, author$project$Page$Timelogs$DonutChartMsg, cmd));
				}(
					A2(author$project$DonutChart$update, donutChartMsg, timelogModel.donutChartData));
		}
	});
var author$project$Types$Timelog$CreateTimelogForm = F4(
	function (description, duration, date, project) {
		return {date: date, description: description, duration: duration, project: project};
	});
var author$project$Page$Timelogs$AddTimelog$hasCreateTimelogForm = function (timelog) {
	if (timelog.$ === 'Just') {
		var value = timelog.a;
		return value;
	} else {
		return A4(author$project$Types$Timelog$CreateTimelogForm, '', elm$core$Maybe$Nothing, elm$core$Maybe$Nothing, '');
	}
};
var author$project$Page$Timelogs$AddTimelog$passToModel = F2(
	function (addTimelogModel, model) {
		return _Utils_update(
			model,
			{addTimelogModel: addTimelogModel});
	});
var author$project$Page$Timelogs$AddTimelog$redirectToTimelogsPage = function (model) {
	return A2(elm$browser$Browser$Navigation$pushUrl, model.key, '/');
};
var author$project$Types$Timelog$TimelogMutationResult = F2(
	function (timelog, ok) {
		return {ok: ok, timelog: timelog};
	});
var author$project$Api$Timelog$createTimelogMutation = function (timelog) {
	var taskVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'input',
		function ($) {
			return $.input;
		},
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$object,
			'TaskInput',
			_List_fromArray(
				[
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'description',
					function ($) {
						return $.description;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'duration',
					function ($) {
						return $.duration;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'date',
					function ($) {
						return $.date;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'project',
					function ($) {
						return $.project;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string)
				])));
	var mutationRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'createTask',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'input',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(taskVar))
				]),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'ok', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'task', _List_Nil, author$project$Api$Timelog$timelogObject),
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$Timelog$TimelogMutationResult)))));
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
		timelog,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(mutationRoot));
};
var author$project$Types$Timelog$CreateTimelogMutation = F4(
	function (description, duration, date, project) {
		return {date: date, description: description, duration: duration, project: project};
	});
var author$project$Utils$TimeDelta$twoDigitTime = function (_int) {
	return (_int < 10) ? ('0' + elm$core$String$fromInt(_int)) : elm$core$String$fromInt(_int);
};
var author$project$Utils$TimeDelta$toString = function (timeDelta) {
	var time = A2(
		elm$core$String$join,
		':',
		_List_fromArray(
			[
				author$project$Utils$TimeDelta$twoDigitTime(timeDelta.hours),
				author$project$Utils$TimeDelta$twoDigitTime(timeDelta.minutes),
				author$project$Utils$TimeDelta$twoDigitTime(timeDelta.seconds)
			]));
	var days = function () {
		if (timeDelta.days > 0) {
			var stringDays = elm$core$String$fromInt(timeDelta.days);
			var daysString = (timeDelta.days === 1) ? ' day ' : ' days ';
			return _Utils_ap(stringDays, daysString);
		} else {
			return '';
		}
	}();
	return _Utils_ap(days, time);
};
var author$project$Api$Timelog$convertToCreateTimelogMutation = function (timelog) {
	var durationString = function () {
		var _n1 = timelog.duration;
		if (_n1.$ === 'Just') {
			var duration = _n1.a;
			return author$project$Utils$TimeDelta$toString(duration);
		} else {
			return '';
		}
	}();
	var dateString = function () {
		var _n0 = timelog.date;
		if (_n0.$ === 'Just') {
			var date = _n0.a;
			return justinmimbs$date$Date$toIsoString(date);
		} else {
			return '';
		}
	}();
	return A4(author$project$Types$Timelog$CreateTimelogMutation, timelog.description, durationString, dateString, timelog.project);
};
var author$project$Api$Timelog$processCreateTimelogInput = function (timelog) {
	var newTimeLog = author$project$Api$Timelog$convertToCreateTimelogMutation(timelog);
	return {input: newTimeLog};
};
var author$project$Page$Timelogs$AddTimelog$ReceiveCreateTimelogMutationResponse = function (a) {
	return {$: 'ReceiveCreateTimelogMutationResponse', a: a};
};
var author$project$Page$Timelogs$AddTimelog$sendCreateTimelogMutation = function (model) {
	var addTimelogModel = model.addTimelogModel;
	var _n0 = addTimelogModel.createForm;
	if (_n0.$ === 'Just') {
		var createForm = _n0.a;
		return A2(
			elm$core$Task$attempt,
			author$project$Page$Timelogs$AddTimelog$ReceiveCreateTimelogMutationResponse,
			A2(
				author$project$Api$sendMutationRequest,
				model.flags.csrftoken,
				author$project$Api$Timelog$createTimelogMutation(
					author$project$Api$Timelog$processCreateTimelogInput(createForm))));
	} else {
		return elm$core$Platform$Cmd$none;
	}
};
var justinmimbs$date$Date$isBetween = F3(
	function (_n0, _n1, _n2) {
		var a = _n0.a;
		var b = _n1.a;
		var x = _n2.a;
		return A3(justinmimbs$date$Date$isBetweenInt, a, b, x);
	});
var author$project$Page$Timelogs$AddTimelog$update = F2(
	function (msg, model) {
		var addTimelogModel = model.addTimelogModel;
		var timelogModel = model.timelogModel;
		var projectModel = model.projectModel;
		switch (msg.$) {
			case 'SubmitCreateTimelog':
				var newTimelogModel = _Utils_update(
					addTimelogModel,
					{isPending: true});
				return _Utils_Tuple2(
					A2(author$project$Page$Timelogs$AddTimelog$passToModel, newTimelogModel, model),
					author$project$Page$Timelogs$AddTimelog$sendCreateTimelogMutation(model));
			case 'ReceiveCreateTimelogMutationResponse':
				if (msg.a.$ === 'Err') {
					var err = msg.a.a;
					var newTimelogModel = _Utils_update(
						addTimelogModel,
						{isPending: false});
					var newModel = _Utils_update(
						model,
						{
							errorMsg: elm$core$Maybe$Just(err)
						});
					return _Utils_Tuple2(
						A2(author$project$Page$Timelogs$AddTimelog$passToModel, newTimelogModel, newModel),
						elm$core$Platform$Cmd$none);
				} else {
					var response = msg.a.a;
					var range = A2(author$project$Page$rangeFromDate, timelogModel.filterDate, timelogModel.filterView);
					var start = range.a;
					var newAddTimelogModel = _Utils_update(
						addTimelogModel,
						{createForm: elm$core$Maybe$Nothing, isPending: false});
					var end = range.b;
					if (A3(justinmimbs$date$Date$isBetween, start, end, response.timelog.date)) {
						var timelogs = A2(elm$core$Array$push, response.timelog, timelogModel.timelogs);
						var newTimelogModel = _Utils_update(
							timelogModel,
							{timelogs: timelogs});
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{addTimelogModel: newAddTimelogModel, timelogModel: newTimelogModel}),
							author$project$Page$Timelogs$AddTimelog$redirectToTimelogsPage(model));
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{addTimelogModel: newAddTimelogModel}),
							author$project$Page$Timelogs$AddTimelog$redirectToTimelogsPage(model));
					}
				}
			case 'InputCreateTimelogDescription':
				var string = msg.a;
				var timelog = author$project$Page$Timelogs$AddTimelog$hasCreateTimelogForm(addTimelogModel.createForm);
				var newTimelog = _Utils_update(
					timelog,
					{description: string});
				return _Utils_Tuple2(
					A2(
						author$project$Page$Timelogs$AddTimelog$passToModel,
						_Utils_update(
							addTimelogModel,
							{
								createForm: elm$core$Maybe$Just(newTimelog)
							}),
						model),
					elm$core$Platform$Cmd$none);
			case 'InputCreateTimelogDate':
				var string = msg.a;
				var timelog = author$project$Page$Timelogs$AddTimelog$hasCreateTimelogForm(addTimelogModel.createForm);
				var newTimelog = _Utils_update(
					timelog,
					{
						date: elm$core$Result$toMaybe(
							justinmimbs$date$Date$fromIsoString(string))
					});
				return _Utils_Tuple2(
					A2(
						author$project$Page$Timelogs$AddTimelog$passToModel,
						_Utils_update(
							addTimelogModel,
							{
								createForm: elm$core$Maybe$Just(newTimelog)
							}),
						model),
					elm$core$Platform$Cmd$none);
			case 'InputCreateTimelogDuration':
				var string = msg.a;
				var timelog = author$project$Page$Timelogs$AddTimelog$hasCreateTimelogForm(addTimelogModel.createForm);
				var newTimelog = _Utils_update(
					timelog,
					{
						duration: elm$core$Result$toMaybe(
							author$project$Utils$TimeDelta$parse(string))
					});
				return _Utils_Tuple2(
					A2(
						author$project$Page$Timelogs$AddTimelog$passToModel,
						_Utils_update(
							addTimelogModel,
							{
								createForm: elm$core$Maybe$Just(newTimelog)
							}),
						model),
					elm$core$Platform$Cmd$none);
			case 'InputCreateTimelogProject':
				var string = msg.a;
				var timelog = author$project$Page$Timelogs$AddTimelog$hasCreateTimelogForm(addTimelogModel.createForm);
				var newTimelog = _Utils_update(
					timelog,
					{project: string});
				return _Utils_Tuple2(
					A2(
						author$project$Page$Timelogs$AddTimelog$passToModel,
						_Utils_update(
							addTimelogModel,
							{
								createForm: elm$core$Maybe$Just(newTimelog)
							}),
						model),
					elm$core$Platform$Cmd$none);
			default:
				var newAddTimelogModel = _Utils_update(
					addTimelogModel,
					{createForm: elm$core$Maybe$Nothing});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{addTimelogModel: newAddTimelogModel}),
					author$project$Page$Timelogs$AddTimelog$redirectToTimelogsPage(model));
		}
	});
var author$project$Page$Timelogs$EditTimelog$passToModel = F2(
	function (timelogModel, model) {
		return _Utils_update(
			model,
			{editTimelogModel: timelogModel});
	});
var elm$browser$Browser$Navigation$back = F2(
	function (key, n) {
		return A2(_Browser_go, key, -n);
	});
var author$project$Page$Timelogs$EditTimelog$redirectToTimelogsPage = function (model) {
	return A2(elm$browser$Browser$Navigation$back, model.key, 1);
};
var author$project$Types$Timelog$TimelogDeleteMutationResult = F2(
	function (timelogId, ok) {
		return {ok: ok, timelogId: timelogId};
	});
var author$project$Api$Timelog$deleteTimelogMutation = function (timelog) {
	var taskVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'input',
		function ($) {
			return $.input;
		},
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$object,
			'DeleteTaskInput',
			_List_fromArray(
				[
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'id',
					function ($) {
						return $.id;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string)
				])));
	var mutationRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'deleteTask',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'input',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(taskVar))
				]),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'ok', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'taskId', _List_Nil, author$project$Api$uuid),
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$Timelog$TimelogDeleteMutationResult)))));
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
		timelog,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(mutationRoot));
};
var author$project$Types$Timelog$DeleteTimelogMutation = function (id) {
	return {id: id};
};
var author$project$Api$Timelog$convertToDeleteTimelogMutation = function (id) {
	return author$project$Types$Timelog$DeleteTimelogMutation(
		danyx23$elm_uuid$Uuid$toString(id));
};
var author$project$Api$Timelog$processDeleteTimelogInput = function (id) {
	var newTimeLog = author$project$Api$Timelog$convertToDeleteTimelogMutation(id);
	return {input: newTimeLog};
};
var author$project$Page$Timelogs$EditTimelog$ReceiveDeleteTimelogMutationResponse = function (a) {
	return {$: 'ReceiveDeleteTimelogMutationResponse', a: a};
};
var author$project$Page$Timelogs$EditTimelog$sendDeleteTimelogMutation = function (model) {
	var editTimelogModel = model.editTimelogModel;
	var _n0 = editTimelogModel.updateForm;
	if (_n0.$ === 'Just') {
		var form = _n0.a;
		return A2(
			elm$core$Task$attempt,
			author$project$Page$Timelogs$EditTimelog$ReceiveDeleteTimelogMutationResponse,
			A2(
				author$project$Api$sendMutationRequest,
				model.flags.csrftoken,
				author$project$Api$Timelog$deleteTimelogMutation(
					author$project$Api$Timelog$processDeleteTimelogInput(form.id))));
	} else {
		return elm$core$Platform$Cmd$none;
	}
};
var author$project$Types$Timelog$UpdateTimelogMutation = F5(
	function (id, description, duration, date, project) {
		return {date: date, description: description, duration: duration, id: id, project: project};
	});
var author$project$Api$Timelog$convertToUpdateTimelogMutation = function (timelog) {
	var projectId = danyx23$elm_uuid$Uuid$toString(timelog.project);
	var id = danyx23$elm_uuid$Uuid$toString(timelog.id);
	var durationString = author$project$Utils$TimeDelta$toString(timelog.duration);
	var dateString = justinmimbs$date$Date$toIsoString(timelog.date);
	return A5(author$project$Types$Timelog$UpdateTimelogMutation, id, timelog.description, durationString, dateString, projectId);
};
var author$project$Api$Timelog$processUpdateTimelogInput = function (timelog) {
	var newTimeLog = author$project$Api$Timelog$convertToUpdateTimelogMutation(timelog);
	return {input: newTimeLog};
};
var author$project$Api$Timelog$updateTimelogMutation = function (timelog) {
	var taskVar = A3(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$required,
		'input',
		function ($) {
			return $.input;
		},
		A2(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$object,
			'UpdateTaskInput',
			_List_fromArray(
				[
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'id',
					function ($) {
						return $.id;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'description',
					function ($) {
						return $.description;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'duration',
					function ($) {
						return $.duration;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'date',
					function ($) {
						return $.date;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string),
					A3(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$field,
					'project',
					function ($) {
						return $.project;
					},
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Variable$string)
				])));
	var mutationRoot = jamesmacaulay$elm_graphql$GraphQL$Request$Builder$extract(
		A3(
			jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field,
			'updateTask',
			_List_fromArray(
				[
					_Utils_Tuple2(
					'input',
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$Arg$variable(taskVar))
				]),
			A2(
				jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
				A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'ok', _List_Nil, jamesmacaulay$elm_graphql$GraphQL$Request$Builder$bool),
				A2(
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$with,
					A3(jamesmacaulay$elm_graphql$GraphQL$Request$Builder$field, 'task', _List_Nil, author$project$Api$Timelog$timelogObject),
					jamesmacaulay$elm_graphql$GraphQL$Request$Builder$object(author$project$Types$Timelog$TimelogMutationResult)))));
	return A2(
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$request,
		timelog,
		jamesmacaulay$elm_graphql$GraphQL$Request$Builder$mutationDocument(mutationRoot));
};
var author$project$Page$Timelogs$EditTimelog$ReceiveUpdateTimelogMutationResponse = function (a) {
	return {$: 'ReceiveUpdateTimelogMutationResponse', a: a};
};
var author$project$Page$Timelogs$EditTimelog$sendUpdateTimelogMutation = function (model) {
	var editTimelogModel = model.editTimelogModel;
	var _n0 = editTimelogModel.updateForm;
	if (_n0.$ === 'Just') {
		var updateForm = _n0.a;
		return A2(
			elm$core$Task$attempt,
			author$project$Page$Timelogs$EditTimelog$ReceiveUpdateTimelogMutationResponse,
			A2(
				author$project$Api$sendMutationRequest,
				model.flags.csrftoken,
				author$project$Api$Timelog$updateTimelogMutation(
					author$project$Api$Timelog$processUpdateTimelogInput(updateForm))));
	} else {
		return elm$core$Platform$Cmd$none;
	}
};
var author$project$Types$Timelog$UpdateTimelogForm = F5(
	function (id, description, duration, date, project) {
		return {date: date, description: description, duration: duration, id: id, project: project};
	});
var author$project$Page$Timelogs$EditTimelog$update = F2(
	function (msg, model) {
		var editTimelogModel = model.editTimelogModel;
		var timelogModel = model.timelogModel;
		var projectModel = model.projectModel;
		switch (msg.$) {
			case 'ReceiveEditTimelogResponse':
				if (msg.a.$ === 'Err') {
					var err = msg.a.a;
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				} else {
					var response = msg.a.a;
					var newProjectModel = _Utils_update(
						projectModel,
						{
							projects: elm$core$Array$fromList(response.allProjects)
						});
					var form = A5(author$project$Types$Timelog$UpdateTimelogForm, response.timelog.id, response.timelog.description, response.timelog.duration, response.timelog.date, response.timelog.project.id);
					var newTimelogModel = _Utils_update(
						editTimelogModel,
						{
							updateForm: elm$core$Maybe$Just(form)
						});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{editTimelogModel: newTimelogModel, projectModel: newProjectModel}),
						elm$core$Platform$Cmd$none);
				}
			case 'ReceiveUpdateTimelogMutationResponse':
				if (msg.a.$ === 'Err') {
					var err = msg.a.a;
					var newTimelogModel = _Utils_update(
						editTimelogModel,
						{isPending: false});
					var newModel = _Utils_update(
						model,
						{
							errorMsg: elm$core$Maybe$Just(err)
						});
					return _Utils_Tuple2(
						A2(author$project$Page$Timelogs$EditTimelog$passToModel, newTimelogModel, newModel),
						elm$core$Platform$Cmd$none);
				} else {
					var response = msg.a.a;
					var timelogPositions = A2(
						elm$core$Array$indexedMap,
						F2(
							function (i, x) {
								return _Utils_Tuple2(i, x.id);
							}),
						timelogModel.timelogs);
					var timelogPosition = A2(
						elm$core$Array$filter,
						function (x) {
							return _Utils_eq(x.b, response.timelog.id);
						},
						timelogPositions);
					var timelogIndex = function () {
						var _n1 = A2(elm$core$Array$get, 0, timelogPosition);
						if (_n1.$ === 'Just') {
							var val = _n1.a;
							return val.a;
						} else {
							return 0;
						}
					}();
					var timelogs = A3(elm$core$Array$set, timelogIndex, response.timelog, timelogModel.timelogs);
					var newTimelogModel = _Utils_update(
						timelogModel,
						{timelogs: timelogs});
					var newEditTimelogModel = _Utils_update(
						editTimelogModel,
						{isPending: false, updateForm: elm$core$Maybe$Nothing});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{editTimelogModel: newEditTimelogModel, timelogModel: newTimelogModel}),
						author$project$Page$Timelogs$EditTimelog$redirectToTimelogsPage(model));
				}
			case 'SubmitEditTimelog':
				var newTimelogModel = _Utils_update(
					editTimelogModel,
					{isPending: true});
				return _Utils_Tuple2(
					A2(author$project$Page$Timelogs$EditTimelog$passToModel, newTimelogModel, model),
					author$project$Page$Timelogs$EditTimelog$sendUpdateTimelogMutation(model));
			case 'InputUpdateTimelogDescription':
				var string = msg.a;
				var _n2 = editTimelogModel.updateForm;
				if (_n2.$ === 'Just') {
					var updateForm = _n2.a;
					var newTimelog = _Utils_update(
						updateForm,
						{description: string});
					return _Utils_Tuple2(
						A2(
							author$project$Page$Timelogs$EditTimelog$passToModel,
							_Utils_update(
								editTimelogModel,
								{
									updateForm: elm$core$Maybe$Just(newTimelog)
								}),
							model),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'InputUpdateTimelogDate':
				var string = msg.a;
				var _n3 = editTimelogModel.updateForm;
				if (_n3.$ === 'Just') {
					var updateForm = _n3.a;
					var date = elm$core$Result$toMaybe(
						justinmimbs$date$Date$fromIsoString(string));
					var newTimelog = function () {
						if (date.$ === 'Just') {
							var val = date.a;
							return _Utils_update(
								updateForm,
								{date: val});
						} else {
							return updateForm;
						}
					}();
					return _Utils_Tuple2(
						A2(
							author$project$Page$Timelogs$EditTimelog$passToModel,
							_Utils_update(
								editTimelogModel,
								{
									updateForm: elm$core$Maybe$Just(newTimelog)
								}),
							model),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'InputUpdateTimelogDuration':
				var string = msg.a;
				var _n5 = editTimelogModel.updateForm;
				if (_n5.$ === 'Just') {
					var updateForm = _n5.a;
					var timeDelta = elm$core$Result$toMaybe(
						author$project$Utils$TimeDelta$parse(string));
					var newTimelog = function () {
						if (timeDelta.$ === 'Just') {
							var val = timeDelta.a;
							return _Utils_update(
								updateForm,
								{duration: val});
						} else {
							return updateForm;
						}
					}();
					return _Utils_Tuple2(
						A2(
							author$project$Page$Timelogs$EditTimelog$passToModel,
							_Utils_update(
								editTimelogModel,
								{
									updateForm: elm$core$Maybe$Just(newTimelog)
								}),
							model),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'InputUpdateTimelogProject':
				var string = msg.a;
				var _n7 = editTimelogModel.updateForm;
				if (_n7.$ === 'Just') {
					var updateForm = _n7.a;
					var projectId = danyx23$elm_uuid$Uuid$fromString(string);
					var newTimelog = function () {
						if (projectId.$ === 'Just') {
							var val = projectId.a;
							return _Utils_update(
								updateForm,
								{project: val});
						} else {
							return updateForm;
						}
					}();
					return _Utils_Tuple2(
						A2(
							author$project$Page$Timelogs$EditTimelog$passToModel,
							_Utils_update(
								editTimelogModel,
								{
									updateForm: elm$core$Maybe$Just(newTimelog)
								}),
							model),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'ReceiveDeleteTimelogMutationResponse':
				if (msg.a.$ === 'Err') {
					var err = msg.a.a;
					var newModel = _Utils_update(
						model,
						{
							errorMsg: elm$core$Maybe$Just(err)
						});
					var newEditTimelogModel = _Utils_update(
						editTimelogModel,
						{isPending: false});
					return _Utils_Tuple2(
						A2(author$project$Page$Timelogs$EditTimelog$passToModel, newEditTimelogModel, newModel),
						elm$core$Platform$Cmd$none);
				} else {
					var response = msg.a.a;
					var timelogs = A2(
						elm$core$Array$filter,
						function (x) {
							return !_Utils_eq(response.timelogId, x.id);
						},
						timelogModel.timelogs);
					var newTimelogModel = _Utils_update(
						timelogModel,
						{timelogs: timelogs});
					var newEditTimelogModel = _Utils_update(
						editTimelogModel,
						{isPending: false, showModal: false});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{editTimelogModel: newEditTimelogModel, timelogModel: newTimelogModel}),
						author$project$Page$Timelogs$EditTimelog$redirectToTimelogsPage(model));
				}
			case 'DeleteTimelog':
				return _Utils_Tuple2(
					A2(
						author$project$Page$Timelogs$EditTimelog$passToModel,
						_Utils_update(
							editTimelogModel,
							{showModal: true}),
						model),
					elm$core$Platform$Cmd$none);
			case 'SubmitDeleteTimelog':
				return _Utils_Tuple2(
					A2(
						author$project$Page$Timelogs$EditTimelog$passToModel,
						_Utils_update(
							editTimelogModel,
							{isPending: true}),
						model),
					author$project$Page$Timelogs$EditTimelog$sendDeleteTimelogMutation(model));
			case 'CancelEdit':
				var newEditTimelogModel = _Utils_update(
					editTimelogModel,
					{updateForm: elm$core$Maybe$Nothing});
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{editTimelogModel: newEditTimelogModel}),
					author$project$Page$Timelogs$EditTimelog$redirectToTimelogsPage(model));
			default:
				return _Utils_Tuple2(
					A2(
						author$project$Page$Timelogs$EditTimelog$passToModel,
						_Utils_update(
							editTimelogModel,
							{showModal: false}),
						model),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$Page$Users$update = F2(
	function (msg, model) {
		if (msg.a.$ === 'Err') {
			var err = msg.a.a;
			return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		} else {
			var response = msg.a.a;
			var userModel = model.userModel;
			var newUserModel = _Utils_update(
				userModel,
				{users: response.allUsers});
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{userModel: newUserModel}),
				elm$core$Platform$Cmd$none);
		}
	});
var elm$browser$Browser$Navigation$load = _Browser_load;
var elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + elm$core$String$fromInt(port_));
		}
	});
var elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var elm$url$Url$toString = function (url) {
	var http = function () {
		var _n0 = url.protocol;
		if (_n0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'LinkClicked':
				var urlRequest = msg.a;
				if (urlRequest.$ === 'Internal') {
					var url = urlRequest.a;
					return _Utils_Tuple2(
						model,
						A2(
							elm$browser$Browser$Navigation$pushUrl,
							model.key,
							elm$url$Url$toString(url)));
				} else {
					var href = urlRequest.a;
					return _Utils_Tuple2(
						model,
						elm$browser$Browser$Navigation$load(href));
				}
			case 'UrlChanged':
				var url = msg.a;
				return author$project$Main$handleRoute(
					_Utils_update(
						model,
						{url: url}));
			case 'TimelogMsg':
				var timelogMsg = msg.a;
				var _n2 = A2(author$project$Page$Timelogs$update, timelogMsg, model);
				var newModel = _n2.a;
				var timelogCmd = _n2.b;
				return _Utils_Tuple2(
					newModel,
					A2(elm$core$Platform$Cmd$map, author$project$Main$TimelogMsg, timelogCmd));
			case 'AddTimelogMsg':
				var addTimelogMsg = msg.a;
				var _n3 = A2(author$project$Page$Timelogs$AddTimelog$update, addTimelogMsg, model);
				var newModel = _n3.a;
				var addTimelogCmd = _n3.b;
				return _Utils_Tuple2(
					newModel,
					A2(elm$core$Platform$Cmd$map, author$project$Main$AddTimelogMsg, addTimelogCmd));
			case 'EditTimelogMsg':
				var editTimelogMsg = msg.a;
				var _n4 = A2(author$project$Page$Timelogs$EditTimelog$update, editTimelogMsg, model);
				var newModel = _n4.a;
				var editTimelogCmd = _n4.b;
				return _Utils_Tuple2(
					newModel,
					A2(elm$core$Platform$Cmd$map, author$project$Main$EditTimelogMsg, editTimelogCmd));
			case 'ProjectMsg':
				var projectMsg = msg.a;
				var _n5 = A2(author$project$Page$Projects$update, projectMsg, model);
				var newModel = _n5.a;
				var projectCmd = _n5.b;
				return _Utils_Tuple2(
					newModel,
					A2(elm$core$Platform$Cmd$map, author$project$Main$ProjectMsg, projectCmd));
			case 'AddProjectMsg':
				var addProjectMsg = msg.a;
				var _n6 = A2(author$project$Page$Projects$AddProject$update, addProjectMsg, model);
				var newModel = _n6.a;
				var addProjectCmd = _n6.b;
				return _Utils_Tuple2(
					newModel,
					A2(elm$core$Platform$Cmd$map, author$project$Main$AddProjectMsg, addProjectCmd));
			case 'EditProjectMsg':
				var editProjectMsg = msg.a;
				var _n7 = A2(author$project$Page$Projects$EditProject$update, editProjectMsg, model);
				var newModel = _n7.a;
				var editProjectCmd = _n7.b;
				return _Utils_Tuple2(
					newModel,
					A2(elm$core$Platform$Cmd$map, author$project$Main$EditProjectMsg, editProjectCmd));
			case 'UserMsg':
				var userMsg = msg.a;
				var _n8 = A2(author$project$Page$Users$update, userMsg, model);
				var newModel = _n8.a;
				var userCmd = _n8.b;
				return _Utils_Tuple2(
					newModel,
					A2(elm$core$Platform$Cmd$map, author$project$Main$UserMsg, userCmd));
			case 'ProfileMsg':
				var profileMsg = msg.a;
				var _n9 = A2(author$project$Page$Profile$update, profileMsg, model);
				var newModel = _n9.a;
				var profileCmd = _n9.b;
				return _Utils_Tuple2(
					newModel,
					A2(elm$core$Platform$Cmd$map, author$project$Main$ProfileMsg, profileCmd));
			case 'ToggleMenu':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{showMenu: !model.showMenu}),
					elm$core$Platform$Cmd$none);
			case 'Logout':
				return _Utils_Tuple2(
					model,
					elm$browser$Browser$Navigation$load('/accounts/logout/'));
			default:
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Main$CloseErrorMessage = {$: 'CloseErrorMessage'};
var elm$html$Html$button = _VirtualDom_node('button');
var elm$html$Html$div = _VirtualDom_node('div');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Main$errorMessageView = function (errorString) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('notification is-danger')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('delete'),
						elm$html$Html$Events$onClick(author$project$Main$CloseErrorMessage)
					]),
				_List_Nil),
				elm$html$Html$text(errorString)
			]));
};
var author$project$Main$errorMessages = function (errors) {
	if (errors.$ === 'HttpError') {
		var httpError = errors.a;
		switch (httpError.$) {
			case 'BadUrl':
				var string = httpError.a;
				return author$project$Main$errorMessageView(string);
			case 'Timeout':
				return author$project$Main$errorMessageView('Connection timed out');
			case 'NetworkError':
				return author$project$Main$errorMessageView('There\'s a problem with the network. Please check your connection');
			case 'BadStatus':
				var response = httpError.a;
				return author$project$Main$errorMessageView(response.body);
			default:
				var string = httpError.a;
				var response = httpError.b;
				return author$project$Main$errorMessageView(response.body);
		}
	} else {
		var graphQLErrors = errors.a;
		return A2(
			elm$html$Html$div,
			_List_Nil,
			A2(
				elm$core$List$map,
				function (x) {
					return author$project$Main$errorMessageView(x.message);
				},
				graphQLErrors));
	}
};
var author$project$Main$Logout = {$: 'Logout'};
var elm$html$Html$a = _VirtualDom_node('a');
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var author$project$Main$link = F4(
	function (href, title_, currentRoute, route) {
		var classString = _Utils_eq(currentRoute, route) ? 'selected' : '';
		return A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$href(href),
					elm$html$Html$Attributes$class('navbar-item ' + classString)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(title_)
				]));
	});
var author$project$Main$ToggleMenu = {$: 'ToggleMenu'};
var elm$html$Html$h1 = _VirtualDom_node('h1');
var elm$html$Html$i = _VirtualDom_node('i');
var elm$html$Html$span = _VirtualDom_node('span');
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var elm$html$Html$Attributes$classList = function (classes) {
	return elm$html$Html$Attributes$class(
		A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$map,
				elm$core$Tuple$first,
				A2(elm$core$List$filter, elm$core$Tuple$second, classes))));
};
var author$project$Main$navbarBrand = function (showMenu) {
	return _List_fromArray(
		[
			A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('navbar-item'),
					elm$html$Html$Attributes$href('/')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$h1,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('title is-5')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('icon is-large')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$i,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('far fa-clock')
										]),
									_List_Nil)
								])),
							elm$html$Html$text('Cronos')
						]))
				])),
			A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$attribute, 'role', 'button'),
					elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('navbar-burger burger', true),
							_Utils_Tuple2('is-active', showMenu)
						])),
					A2(elm$html$Html$Attributes$attribute, 'aria-label', 'menu'),
					A2(elm$html$Html$Attributes$attribute, 'aria-expanded', 'false'),
					elm$html$Html$Events$onClick(author$project$Main$ToggleMenu)
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$span,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
						]),
					_List_Nil),
					A2(
					elm$html$Html$span,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
						]),
					_List_Nil),
					A2(
					elm$html$Html$span,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$attribute, 'aria-hidden', 'true')
						]),
					_List_Nil)
				]))
		]);
};
var elm$html$Html$nav = _VirtualDom_node('nav');
var author$project$Main$nav = function (model) {
	var route = author$project$Route$fromUrl(model.url);
	return A2(
		elm$html$Html$nav,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('navbar'),
				A2(elm$html$Html$Attributes$attribute, 'role', 'navigation'),
				A2(elm$html$Html$Attributes$attribute, 'aria-label', 'main navigation')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('navbar-brand')
					]),
				author$project$Main$navbarBrand(model.showMenu)),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('navbar-menu', true),
								_Utils_Tuple2('is-active', model.showMenu)
							]))
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('navbar-start')
							]),
						_List_fromArray(
							[
								A4(author$project$Main$link, '/', 'Times', route, author$project$Route$TimelogsR),
								A4(author$project$Main$link, '/projects', 'Projects', route, author$project$Route$ProjectsR)
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('navbar-end')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('navbar-item')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$div,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('field is-grouped')
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$div,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('control ')
													]),
												_List_fromArray(
													[
														A2(
														elm$html$Html$a,
														_List_fromArray(
															[
																elm$html$Html$Attributes$href('/profile'),
																elm$html$Html$Attributes$class('icon is-large')
															]),
														_List_fromArray(
															[
																A2(
																elm$html$Html$span,
																_List_fromArray(
																	[
																		elm$html$Html$Attributes$class('fas fa-lg fa-user')
																	]),
																_List_Nil)
															]))
													])),
												A2(
												elm$html$Html$div,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('control')
													]),
												_List_fromArray(
													[
														A2(
														elm$html$Html$a,
														_List_fromArray(
															[
																elm$html$Html$Events$onClick(author$project$Main$Logout),
																elm$html$Html$Attributes$class('icon is-large')
															]),
														_List_fromArray(
															[
																A2(
																elm$html$Html$span,
																_List_fromArray(
																	[
																		elm$html$Html$Attributes$class('fas fa-lg fa-sign-out-alt')
																	]),
																_List_Nil)
															]))
													]))
											]))
									]))
							]))
					]))
			]));
};
var elm$html$Html$header = _VirtualDom_node('header');
var author$project$Main$header = function (model) {
	return A2(
		elm$html$Html$header,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('header')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('container')
					]),
				_List_fromArray(
					[
						author$project$Main$nav(model)
					]))
			]));
};
var author$project$Main$title = function (route) {
	var fragment = function () {
		switch (route.$) {
			case 'TimelogsR':
				return 'Times';
			case 'AddTimelogR':
				return 'Add new time';
			case 'EditTimelogR':
				var id = route.a;
				return 'Edit time';
			case 'ProjectsR':
				return 'Projects';
			case 'AddProjectR':
				return 'Add new project';
			case 'EditProjectR':
				var id = route.a;
				return 'Edit project';
			case 'UsersR':
				return 'Users';
			case 'ProfileR':
				return 'Profile';
			default:
				return 'Home';
		}
	}();
	return 'Cronos - ' + fragment;
};
var elm$html$Html$li = _VirtualDom_node('li');
var elm$html$Html$ul = _VirtualDom_node('ul');
var author$project$Page$Profile$view = function (model) {
	var profileModel = model.profileModel;
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('level is-mobile')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('level-left')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('level-item')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$h1,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('title')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Profile')
											]))
									]))
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('level-right')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('level-item')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$a,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('button is-success'),
												elm$html$Html$Attributes$href('/profile/edit')
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$span,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('icon is-small')
													]),
												_List_fromArray(
													[
														A2(
														elm$html$Html$span,
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('fas fa-plus-circle')
															]),
														_List_Nil)
													])),
												A2(
												elm$html$Html$span,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('Edit')
													]))
											]))
									]))
							]))
					])),
				function () {
				var _n0 = profileModel.user;
				if (_n0.$ === 'Just') {
					var user = _n0.a;
					return A2(
						elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$ul,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												elm$html$Html$span,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('title is-6')
													]),
												_List_fromArray(
													[
														elm$html$Html$text('First name: ')
													])),
												A2(
												elm$html$Html$span,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text(user.firstName)
													]))
											])),
										A2(
										elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												elm$html$Html$span,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('title is-6')
													]),
												_List_fromArray(
													[
														elm$html$Html$text('Last name: ')
													])),
												A2(
												elm$html$Html$span,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text(user.lastName)
													]))
											])),
										A2(
										elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												elm$html$Html$span,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('title is-6')
													]),
												_List_fromArray(
													[
														elm$html$Html$text('Email: ')
													])),
												A2(
												elm$html$Html$span,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text(user.email)
													]))
											]))
									]))
							]));
				} else {
					return A2(elm$html$Html$div, _List_Nil, _List_Nil);
				}
			}()
			]));
};
var author$project$Page$Projects$actions = F2(
	function (index, id) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('buttons')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$a,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('button'),
							elm$html$Html$Attributes$href(
							'/projects/edit/' + danyx23$elm_uuid$Uuid$toString(id))
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('fas fa-pen')
								]),
							_List_Nil)
						]))
				]));
	});
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var author$project$Page$Projects$projectView = F2(
	function (index, project) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('custom-columns')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('custom-column column-1')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('project-color'),
									A2(elm$html$Html$Attributes$style, 'background-color', project.colour)
								]),
							_List_Nil),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('project-details')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('has-text-weight-bold is-size-5')
										]),
									_List_fromArray(
										[
											elm$html$Html$text(project.abbreviation)
										]))
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('custom-column column-2')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('has-text-weight-bold is-size-5')
								]),
							_List_fromArray(
								[
									elm$html$Html$text(project.name)
								])),
							A2(
							elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text(project.company)
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('custom-column column-3')
						]),
					_List_fromArray(
						[
							A2(author$project$Page$Projects$actions, index, project.id)
						]))
				]));
	});
var author$project$Page$Projects$projectList = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('row-group')
			]),
		A2(
			elm$core$List$indexedMap,
			author$project$Page$Projects$projectView,
			elm$core$Array$toList(model.projectModel.projects)));
};
var elm$html$Html$h2 = _VirtualDom_node('h2');
var author$project$Page$Projects$view = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('level')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('level-left')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$h2,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('title')
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Projects')
									]))
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('level-right')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$a,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('button is-success'),
										elm$html$Html$Attributes$href('/projects/add')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$span,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('icon is-small')
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$span,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('fas fa-plus-circle')
													]),
												_List_Nil)
											])),
										A2(
										elm$html$Html$span,
										_List_Nil,
										_List_fromArray(
											[
												elm$html$Html$text('New')
											]))
									]))
							]))
					])),
				A2(
				elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						author$project$Page$Projects$projectList(model)
					]))
			]));
};
var author$project$Page$Full = {$: 'Full'};
var author$project$Page$Short = {$: 'Short'};
var author$project$Page$isFullwidth = function (length) {
	if (length.$ === 'Short') {
		return false;
	} else {
		return true;
	}
};
var elm$html$Html$input = _VirtualDom_node('input');
var elm$html$Html$label = _VirtualDom_node('label');
var elm$html$Html$Attributes$placeholder = elm$html$Html$Attributes$stringProperty('placeholder');
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var author$project$Page$formInput = F5(
	function (type_, placeholder, msg, value, inputLength) {
		var attributes = function () {
			if (value.$ === 'Just') {
				var val = value.a;
				return _List_fromArray(
					[
						elm$html$Html$Attributes$value(val)
					]);
			} else {
				return _List_Nil;
			}
		}();
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('field')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$label,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('label')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$classList(
									_List_fromArray(
										[
											_Utils_Tuple2('control', true),
											_Utils_Tuple2(
											'is-expanded',
											author$project$Page$isFullwidth(inputLength))
										]))
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$input,
									A2(
										elm$core$List$append,
										attributes,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('input'),
												elm$html$Html$Attributes$type_(type_),
												elm$html$Html$Attributes$placeholder(placeholder),
												elm$html$Html$Events$onInput(msg)
											])),
									_List_Nil)
								]))
						]))
				]));
	});
var author$project$Page$fullNameString = function (user) {
	return user.firstName + (' ' + user.lastName);
};
var elm$html$Html$h4 = _VirtualDom_node('h4');
var elm$html$Html$p = _VirtualDom_node('p');
var author$project$Page$membersSelect = F4(
	function (members, availableUsers, removeMembersMsg, addMembersMsg) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('field')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$h4,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('title is-4 has-text-centered-mobile')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Assigned')
								])),
							elm$core$List$isEmpty(members) ? A2(
							elm$html$Html$p,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('subtitle has-text-centered is-6')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('No users assigned')
								])) : A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('field is-grouped is-grouped-multiline')
								]),
							A2(
								elm$core$List$map,
								function (user) {
									return A2(
										elm$html$Html$div,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('control')
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$div,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('tags has-addons')
													]),
												_List_fromArray(
													[
														A2(
														elm$html$Html$span,
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('tag is-capitalized is-primary')
															]),
														_List_fromArray(
															[
																elm$html$Html$text(
																author$project$Page$fullNameString(user))
															])),
														A2(
														elm$html$Html$span,
														_List_fromArray(
															[
																elm$html$Html$Events$onClick(
																removeMembersMsg(user)),
																elm$html$Html$Attributes$class('tag is-delete')
															]),
														_List_Nil)
													]))
											]));
								},
								members))
						])),
					A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							elm$html$Html$h4,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('title is-4 has-text-centered-mobile')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('Available')
								])),
							elm$core$List$isEmpty(availableUsers) ? A2(
							elm$html$Html$p,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('subtitle has-text-centered is-6')
								]),
							_List_fromArray(
								[
									elm$html$Html$text('No users to add')
								])) : A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('field is-grouped is-grouped-multiline')
								]),
							A2(
								elm$core$List$map,
								function (user) {
									return A2(
										elm$html$Html$div,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('control')
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$div,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('tags has-addons')
													]),
												_List_fromArray(
													[
														A2(
														elm$html$Html$span,
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('tag is-capitalized is-primary'),
																elm$html$Html$Events$onClick(
																addMembersMsg(user))
															]),
														_List_fromArray(
															[
																elm$html$Html$text(
																author$project$Page$fullNameString(user))
															]))
													]))
											]));
								},
								availableUsers))
						]))
				]));
	});
var author$project$Page$Projects$AddProject$AddMembers = function (a) {
	return {$: 'AddMembers', a: a};
};
var author$project$Page$Projects$AddProject$CancelAdd = {$: 'CancelAdd'};
var author$project$Page$Projects$AddProject$InputCreateProjectAbbreviation = function (a) {
	return {$: 'InputCreateProjectAbbreviation', a: a};
};
var author$project$Page$Projects$AddProject$InputCreateProjectColour = function (a) {
	return {$: 'InputCreateProjectColour', a: a};
};
var author$project$Page$Projects$AddProject$InputCreateProjectCompany = function (a) {
	return {$: 'InputCreateProjectCompany', a: a};
};
var author$project$Page$Projects$AddProject$InputCreateProjectName = function (a) {
	return {$: 'InputCreateProjectName', a: a};
};
var author$project$Page$Projects$AddProject$InputCreateProjectWorkDay = function (a) {
	return {$: 'InputCreateProjectWorkDay', a: a};
};
var author$project$Page$Projects$AddProject$RemoveMembers = function (a) {
	return {$: 'RemoveMembers', a: a};
};
var author$project$Page$Projects$AddProject$SubmitCreateProject = {$: 'SubmitCreateProject'};
var elm$html$Html$h3 = _VirtualDom_node('h3');
var author$project$Page$Projects$AddProject$createProjectForm = function (model) {
	var addProjectModel = model.addProjectModel;
	var userModel = model.userModel;
	var members = addProjectModel.addMembers;
	var button = function () {
		var _n0 = addProjectModel.isPending;
		if (_n0) {
			return A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('button is-primary is-loading'),
						A2(elm$html$Html$Attributes$attribute, 'disabled', 'disabled')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Submit')
					]));
		} else {
			return A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('button is-primary'),
						elm$html$Html$Events$onClick(author$project$Page$Projects$AddProject$SubmitCreateProject)
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Submit')
					]));
		}
	}();
	var availableUsers = A2(
		elm$core$List$filter,
		function (user) {
			return !A2(elm$core$List$member, user, members);
		},
		userModel.users);
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$h3,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('title')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Add')
					])),
				A5(author$project$Page$formInput, 'text', 'Name', author$project$Page$Projects$AddProject$InputCreateProjectName, elm$core$Maybe$Nothing, author$project$Page$Full),
				A5(author$project$Page$formInput, 'text', 'Company', author$project$Page$Projects$AddProject$InputCreateProjectCompany, elm$core$Maybe$Nothing, author$project$Page$Full),
				A5(author$project$Page$formInput, 'text', 'Abbreviation', author$project$Page$Projects$AddProject$InputCreateProjectAbbreviation, elm$core$Maybe$Nothing, author$project$Page$Full),
				A5(author$project$Page$formInput, 'text', 'Hours in work day', author$project$Page$Projects$AddProject$InputCreateProjectWorkDay, elm$core$Maybe$Nothing, author$project$Page$Short),
				A5(author$project$Page$formInput, 'color', 'Colour', author$project$Page$Projects$AddProject$InputCreateProjectColour, elm$core$Maybe$Nothing, author$project$Page$Short),
				A4(author$project$Page$membersSelect, members, availableUsers, author$project$Page$Projects$AddProject$RemoveMembers, author$project$Page$Projects$AddProject$AddMembers),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('field')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('control')
							]),
						_List_fromArray(
							[
								button,
								A2(
								elm$html$Html$button,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('button is-text'),
										elm$html$Html$Events$onClick(author$project$Page$Projects$AddProject$CancelAdd)
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Cancel')
									]))
							]))
					]))
			]));
};
var author$project$Page$Projects$AddProject$view = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('level')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('level-left')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$h2,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('title')
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Projects')
									]))
							]))
					])),
				author$project$Page$Projects$AddProject$createProjectForm(model)
			]));
};
var author$project$Page$modal = F4(
	function (contents, model, showModal, closeMsg) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('modal', true),
							_Utils_Tuple2('is-active', showModal)
						]))
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('modal-background')
						]),
					_List_Nil),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('modal-content')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('box')
								]),
							_List_fromArray(
								[
									contents(model)
								]))
						])),
					A2(
					elm$html$Html$button,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('modal-close is-large'),
							A2(elm$html$Html$Attributes$attribute, 'aria-label', 'close'),
							elm$html$Html$Events$onClick(closeMsg)
						]),
					_List_Nil)
				]));
	});
var author$project$Page$Projects$EditProject$CancelEdit = {$: 'CancelEdit'};
var author$project$Page$Projects$EditProject$DeleteProject = {$: 'DeleteProject'};
var author$project$Page$Projects$EditProject$CloseFormModal = {$: 'CloseFormModal'};
var author$project$Page$Projects$EditProject$SubmitDeleteProject = {$: 'SubmitDeleteProject'};
var author$project$Page$Projects$EditProject$deleteProjectForm = function (model) {
	var editProjectModel = model.editProjectModel;
	var button = function () {
		var _n0 = editProjectModel.isPending;
		if (_n0) {
			return A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('button is-primary is-loading'),
						A2(elm$html$Html$Attributes$attribute, 'disabled', 'disabled')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Confirm')
					]));
		} else {
			return A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('button is-primary'),
						elm$html$Html$Events$onClick(author$project$Page$Projects$EditProject$SubmitDeleteProject)
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Confirm')
					]));
		}
	}();
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$h3,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('title')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Delete')
					])),
				A2(
				elm$html$Html$p,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('field')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Are you sure you want to delete this project?')
					])),
				A2(
				elm$html$Html$p,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('field')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('You will lose all data associated with this project including the times logged against it')
					])),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('field')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('control')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('buttons')
									]),
								_List_fromArray(
									[
										button,
										A2(
										elm$html$Html$button,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('button is-text'),
												elm$html$Html$Events$onClick(author$project$Page$Projects$EditProject$CloseFormModal)
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Cancel')
											]))
									]))
							]))
					]))
			]));
};
var author$project$Page$Projects$EditProject$AddMembers = function (a) {
	return {$: 'AddMembers', a: a};
};
var author$project$Page$Projects$EditProject$InputUpdateProjectAbbreviation = function (a) {
	return {$: 'InputUpdateProjectAbbreviation', a: a};
};
var author$project$Page$Projects$EditProject$InputUpdateProjectColour = function (a) {
	return {$: 'InputUpdateProjectColour', a: a};
};
var author$project$Page$Projects$EditProject$InputUpdateProjectCompany = function (a) {
	return {$: 'InputUpdateProjectCompany', a: a};
};
var author$project$Page$Projects$EditProject$InputUpdateProjectName = function (a) {
	return {$: 'InputUpdateProjectName', a: a};
};
var author$project$Page$Projects$EditProject$InputUpdateProjectWorkDay = function (a) {
	return {$: 'InputUpdateProjectWorkDay', a: a};
};
var author$project$Page$Projects$EditProject$RemoveMembers = function (a) {
	return {$: 'RemoveMembers', a: a};
};
var author$project$Page$Projects$EditProject$SubmitEditProject = {$: 'SubmitEditProject'};
var author$project$Page$Projects$EditProject$updateProjectForm = F2(
	function (form, model) {
		var editProjectModel = model.editProjectModel;
		var userModel = model.userModel;
		var members = A2(
			elm$core$List$filter,
			function (user) {
				return !A2(elm$core$List$member, user, editProjectModel.removeMembers);
			},
			A2(elm$core$List$append, editProjectModel.addMembers, form.members));
		var button = function () {
			var _n0 = editProjectModel.isPending;
			if (_n0) {
				return A2(
					elm$html$Html$button,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('button is-primary is-loading'),
							A2(elm$html$Html$Attributes$attribute, 'disabled', 'disabled')
						]),
					_List_fromArray(
						[
							elm$html$Html$text('Submit')
						]));
			} else {
				return A2(
					elm$html$Html$button,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('button is-primary'),
							elm$html$Html$Events$onClick(author$project$Page$Projects$EditProject$SubmitEditProject)
						]),
					_List_fromArray(
						[
							elm$html$Html$text('Submit')
						]));
			}
		}();
		var availableUsers = A2(
			elm$core$List$filter,
			function (user) {
				return !A2(elm$core$List$member, user, members);
			},
			userModel.users);
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$h3,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('title')
						]),
					_List_fromArray(
						[
							elm$html$Html$text('Update')
						])),
					A5(
					author$project$Page$formInput,
					'text',
					'Name',
					author$project$Page$Projects$EditProject$InputUpdateProjectName,
					elm$core$Maybe$Just(form.name),
					author$project$Page$Full),
					A5(
					author$project$Page$formInput,
					'text',
					'Company',
					author$project$Page$Projects$EditProject$InputUpdateProjectCompany,
					elm$core$Maybe$Just(form.company),
					author$project$Page$Full),
					A5(
					author$project$Page$formInput,
					'text',
					'Abbreviation',
					author$project$Page$Projects$EditProject$InputUpdateProjectAbbreviation,
					elm$core$Maybe$Just(form.abbreviation),
					author$project$Page$Full),
					A5(
					author$project$Page$formInput,
					'text',
					'Hours in work day',
					author$project$Page$Projects$EditProject$InputUpdateProjectWorkDay,
					elm$core$Maybe$Just(
						elm$core$String$fromInt(form.workDayHours)),
					author$project$Page$Short),
					A5(
					author$project$Page$formInput,
					'color',
					'Colour',
					author$project$Page$Projects$EditProject$InputUpdateProjectColour,
					elm$core$Maybe$Just(form.colour),
					author$project$Page$Short),
					A4(author$project$Page$membersSelect, members, availableUsers, author$project$Page$Projects$EditProject$RemoveMembers, author$project$Page$Projects$EditProject$AddMembers),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('field')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('control')
								]),
							_List_fromArray(
								[
									button,
									A2(
									elm$html$Html$button,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('button is-text'),
											elm$html$Html$Events$onClick(author$project$Page$Projects$EditProject$CancelEdit)
										]),
									_List_fromArray(
										[
											elm$html$Html$text('Cancel')
										]))
								]))
						]))
				]));
	});
var author$project$Page$Projects$EditProject$view = function (model) {
	var editProjectModel = model.editProjectModel;
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('level')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('level-left')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('level-item')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$h2,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('title')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Projects')
											]))
									]))
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('level-right')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('level-item')
									]),
								_List_fromArray(
									[
										function () {
										var _n0 = editProjectModel.updateForm;
										if (_n0.$ === 'Just') {
											var form = _n0.a;
											return A2(
												elm$html$Html$button,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('button is-danger'),
														elm$html$Html$Events$onClick(author$project$Page$Projects$EditProject$DeleteProject)
													]),
												_List_fromArray(
													[
														A2(
														elm$html$Html$span,
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('icon is-small')
															]),
														_List_fromArray(
															[
																A2(
																elm$html$Html$span,
																_List_fromArray(
																	[
																		elm$html$Html$Attributes$class('fas fa-times-circle')
																	]),
																_List_Nil)
															])),
														A2(
														elm$html$Html$span,
														_List_Nil,
														_List_fromArray(
															[
																elm$html$Html$text('Delete')
															]))
													]));
										} else {
											return A2(elm$html$Html$div, _List_Nil, _List_Nil);
										}
									}()
									]))
							]))
					])),
				function () {
				var _n1 = editProjectModel.updateForm;
				if (_n1.$ === 'Just') {
					var form = _n1.a;
					return A2(author$project$Page$Projects$EditProject$updateProjectForm, form, model);
				} else {
					return A2(elm$html$Html$div, _List_Nil, _List_Nil);
				}
			}(),
				A4(author$project$Page$modal, author$project$Page$Projects$EditProject$deleteProjectForm, model, editProjectModel.showModal, author$project$Page$Projects$EditProject$CancelEdit)
			]));
};
var author$project$Page$Left = {$: 'Left'};
var author$project$Page$Right = {$: 'Right'};
var author$project$Page$Timelogs$NextMonth = {$: 'NextMonth'};
var author$project$Page$Timelogs$NextWeek = {$: 'NextWeek'};
var author$project$Page$Timelogs$PreviousMonth = {$: 'PreviousMonth'};
var author$project$Page$Timelogs$PreviousWeek = {$: 'PreviousWeek'};
var author$project$Page$Timelogs$dateNavButton = F2(
	function (direction, filterView) {
		var msgTuple = function () {
			if (filterView.$ === 'WeekView') {
				return _Utils_Tuple2(author$project$Page$Timelogs$PreviousWeek, author$project$Page$Timelogs$NextWeek);
			} else {
				return _Utils_Tuple2(author$project$Page$Timelogs$PreviousMonth, author$project$Page$Timelogs$NextMonth);
			}
		}();
		var msg = function () {
			if (direction.$ === 'Left') {
				return msgTuple.a;
			} else {
				return msgTuple.b;
			}
		}();
		var _class = function () {
			if (direction.$ === 'Left') {
				return 'fas fa-chevron-left';
			} else {
				return 'fas fa-chevron-right';
			}
		}();
		return A2(
			elm$html$Html$span,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('is-clearfix')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$button,
					_List_fromArray(
						[
							elm$html$Html$Events$onClick(msg),
							function () {
							if (direction.$ === 'Left') {
								return elm$html$Html$Attributes$class('button is-small is-pulled-right');
							} else {
								return elm$html$Html$Attributes$class('button is-small');
							}
						}()
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('icon is-small')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$i,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class(_class)
										]),
									_List_Nil)
								]))
						]))
				]));
	});
var author$project$DonutChart$Segment = F3(
	function (start, end, color) {
		return {color: color, end: end, start: start};
	});
var elm$svg$Svg$text = elm$virtual_dom$VirtualDom$text;
var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$text_ = elm$svg$Svg$trustedNode('text');
var elm$svg$Svg$tspan = elm$svg$Svg$trustedNode('tspan');
var elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var author$project$DonutChart$formatDisplay = function (timeDelta) {
	var dayString = function () {
		var _n0 = timeDelta.days;
		if (_n0 === 1) {
			return 'day';
		} else {
			return 'days';
		}
	}();
	return _List_fromArray(
		[
			A2(
			elm$svg$Svg$text_,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$x('50%'),
					elm$svg$Svg$Attributes$y('40%'),
					elm$svg$Svg$Attributes$class('large')
				]),
			_List_fromArray(
				[
					elm$svg$Svg$text(
					elm$core$String$fromInt(timeDelta.days)),
					A2(
					elm$svg$Svg$tspan,
					_List_Nil,
					_List_fromArray(
						[
							elm$svg$Svg$text(dayString)
						]))
				])),
			A2(
			elm$svg$Svg$text_,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$x('50%'),
					elm$svg$Svg$Attributes$y('60%'),
					elm$svg$Svg$Attributes$class('small')
				]),
			_List_fromArray(
				[
					elm$svg$Svg$text(
					A2(
						elm$core$String$join,
						':',
						_List_fromArray(
							[
								author$project$Utils$TimeDelta$twoDigitTime(timeDelta.hours),
								author$project$Utils$TimeDelta$twoDigitTime(timeDelta.minutes),
								author$project$Utils$TimeDelta$twoDigitTime(timeDelta.seconds)
							])))
				]))
		]);
};
var elm$core$Basics$pow = _Basics_pow;
var elm$core$Basics$round = _Basics_round;
var elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				elm$core$String$repeat,
				n - elm$core$String$length(string),
				elm$core$String$fromChar(_char)));
	});
var author$project$DonutChart$toFixed = F2(
	function (precision, value) {
		var power = A2(elm$core$Basics$pow, 10, precision);
		var pad = function (num) {
			_n0$2:
			while (true) {
				if (num.b) {
					if (num.b.b) {
						if (!num.b.b.b) {
							var x = num.a;
							var _n1 = num.b;
							var y = _n1.a;
							return _List_fromArray(
								[
									x,
									A3(
									elm$core$String$padRight,
									precision,
									_Utils_chr('0'),
									y)
								]);
						} else {
							break _n0$2;
						}
					} else {
						var val = num.a;
						return (precision > 0) ? _List_fromArray(
							[
								val,
								A3(
								elm$core$String$padRight,
								precision,
								_Utils_chr('0'),
								'')
							]) : _List_fromArray(
							[val]);
					}
				} else {
					break _n0$2;
				}
			}
			var val = num;
			return val;
		};
		return A2(
			elm$core$String$join,
			'.',
			pad(
				A2(
					elm$core$String$split,
					'.',
					elm$core$String$fromFloat(
						elm$core$Basics$round(value * power) / power))));
	});
var elm$core$Basics$cos = _Basics_cos;
var elm$core$Basics$sin = _Basics_sin;
var author$project$DonutChart$getPoint = F2(
	function (angle, radius) {
		var y = radius * (-elm$core$Basics$cos(angle));
		var x = radius * elm$core$Basics$sin(angle);
		return A2(author$project$DonutChart$toFixed, 2, x) + (',' + A2(author$project$DonutChart$toFixed, 2, y));
	});
var elm$core$Basics$pi = _Basics_pi;
var author$project$DonutChart$plotVectors = F3(
	function (innerRadius, outerRadius, segment) {
		var outerEdgeList = F3(
			function (angle, limit, list) {
				outerEdgeList:
				while (true) {
					var newAngle = angle + 5.0e-2;
					var newList = A2(
						elm$core$List$cons,
						A2(author$project$DonutChart$getPoint, newAngle, outerRadius),
						list);
					if (_Utils_cmp(newAngle, limit) < 0) {
						var $temp$angle = newAngle,
							$temp$limit = limit,
							$temp$list = newList;
						angle = $temp$angle;
						limit = $temp$limit;
						list = $temp$list;
						continue outerEdgeList;
					} else {
						return elm$core$List$reverse(list);
					}
				}
			});
		var innerEdgeList = F3(
			function (angle, limit, list) {
				innerEdgeList:
				while (true) {
					var newAngle = angle - 5.0e-2;
					var newList = A2(
						elm$core$List$cons,
						A2(author$project$DonutChart$getPoint, newAngle, innerRadius),
						list);
					if (_Utils_cmp(newAngle, limit) > 0) {
						var $temp$angle = newAngle,
							$temp$limit = limit,
							$temp$list = newList;
						angle = $temp$angle;
						limit = $temp$limit;
						list = $temp$list;
						continue innerEdgeList;
					} else {
						return elm$core$List$reverse(list);
					}
				}
			});
		var c = elm$core$Basics$pi * 2;
		var end = segment.end * c;
		var start = segment.start * c;
		return A2(
			elm$core$String$join,
			' ',
			_Utils_ap(
				_List_fromArray(
					[
						A2(author$project$DonutChart$getPoint, start, outerRadius)
					]),
				_Utils_ap(
					A3(outerEdgeList, start, end, _List_Nil),
					_Utils_ap(
						_List_fromArray(
							[
								A2(author$project$DonutChart$getPoint, end, outerRadius)
							]),
						_Utils_ap(
							_List_fromArray(
								[
									A2(author$project$DonutChart$getPoint, end, innerRadius)
								]),
							_Utils_ap(
								A3(innerEdgeList, end, start, _List_Nil),
								_List_fromArray(
									[
										A2(author$project$DonutChart$getPoint, start, innerRadius)
									])))))));
	});
var author$project$DonutChart$MouseOut = {$: 'MouseOut'};
var author$project$DonutChart$MouseOver = function (a) {
	return {$: 'MouseOver', a: a};
};
var elm$svg$Svg$polygon = elm$svg$Svg$trustedNode('polygon');
var elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var elm$svg$Svg$Attributes$opacity = _VirtualDom_attribute('opacity');
var elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var elm$svg$Svg$Events$onMouseOut = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'mouseout',
		elm$json$Json$Decode$succeed(msg));
};
var elm$svg$Svg$Events$onMouseOver = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'mouseover',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$DonutChart$polygonView = F5(
	function (selected, innerRadius, outerRadius, index, segment) {
		var newSelected = A2(elm$core$Maybe$withDefault, -1, selected);
		var opacity = _Utils_eq(newSelected, -1) ? 1 : (_Utils_eq(newSelected, index) ? 1 : 0.2);
		return A2(
			elm$svg$Svg$polygon,
			_List_fromArray(
				[
					elm$svg$Svg$Events$onMouseOver(
					author$project$DonutChart$MouseOver(index)),
					elm$svg$Svg$Events$onMouseOut(author$project$DonutChart$MouseOut),
					elm$svg$Svg$Attributes$class('donut-segment'),
					elm$svg$Svg$Attributes$fill(segment.color),
					elm$svg$Svg$Attributes$opacity(
					elm$core$String$fromFloat(opacity)),
					elm$svg$Svg$Attributes$points(
					A3(author$project$DonutChart$plotVectors, innerRadius, outerRadius, segment))
				]),
			_List_Nil);
	});
var author$project$DonutChart$segmentsComputed = F2(
	function (total, points) {
		var createSegments = F3(
			function (start, segments, points_) {
				createSegments:
				while (true) {
					var point = function () {
						var _n0 = elm$core$List$head(points_);
						if (_n0.$ === 'Just') {
							var val = _n0.a;
							return val;
						} else {
							return {
								color: '#333',
								display: A4(author$project$Utils$TimeDelta$TimeDelta, 0, 0, 0, 0),
								key: 'unknown',
								value: 0
							};
						}
					}();
					var size = point.value / total;
					var end = start + size;
					if (!elm$core$List$length(points_)) {
						return elm$core$List$reverse(segments);
					} else {
						var newStart = end;
						var newSegments = A2(
							elm$core$List$cons,
							A3(author$project$DonutChart$Segment, start, end, point.color),
							segments);
						var newPoints = A2(elm$core$List$drop, 1, points_);
						var $temp$start = newStart,
							$temp$segments = newSegments,
							$temp$points_ = newPoints;
						start = $temp$start;
						segments = $temp$segments;
						points_ = $temp$points_;
						continue createSegments;
					}
				}
			});
		return A3(createSegments, 0, _List_Nil, points);
	});
var elm$core$List$sortBy = _List_sortBy;
var elm$core$List$sort = function (xs) {
	return A2(elm$core$List$sortBy, elm$core$Basics$identity, xs);
};
var elm$svg$Svg$g = elm$svg$Svg$trustedNode('g');
var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
var elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var author$project$DonutChart$view = function (model) {
	var times = elm$core$List$sort(
		A2(
			elm$core$List$map,
			function (point) {
				return point.value;
			},
			model.points));
	var totalTime = elm$core$List$sum(times);
	var selectedTime = F2(
		function (index, points) {
			var point = A2(
				elm$core$Array$get,
				index,
				elm$core$Array$fromList(points));
			if (point.$ === 'Just') {
				var val = point.a;
				return val.display;
			} else {
				return A4(author$project$Utils$TimeDelta$TimeDelta, 0, 0, 0, 0);
			}
		});
	var curriedPolygon = A3(author$project$DonutChart$polygonView, model.selected, model.innerRadius, model.outerRadius);
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('donut-chart')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('square')
							]),
						_List_fromArray(
							[
								A2(
								elm$svg$Svg$svg,
								_List_fromArray(
									[
										elm$svg$Svg$Attributes$width('200'),
										elm$svg$Svg$Attributes$height('200'),
										elm$svg$Svg$Attributes$viewBox('0 0 200 200')
									]),
								_List_fromArray(
									[
										A2(
										elm$svg$Svg$g,
										_List_fromArray(
											[
												elm$svg$Svg$Attributes$transform('translate(100,100)')
											]),
										(elm$core$List$length(model.points) > 0) ? A2(
											elm$core$List$indexedMap,
											curriedPolygon,
											A2(author$project$DonutChart$segmentsComputed, totalTime, model.points)) : _List_fromArray(
											[
												A2(
												elm$svg$Svg$polygon,
												_List_fromArray(
													[
														elm$svg$Svg$Attributes$class('donut-segment'),
														elm$svg$Svg$Attributes$fill('#333'),
														elm$svg$Svg$Attributes$opacity('0.2'),
														elm$svg$Svg$Attributes$points(
														A3(
															author$project$DonutChart$plotVectors,
															model.innerRadius,
															model.outerRadius,
															A3(author$project$DonutChart$Segment, 0, 1, '#333')))
													]),
												_List_Nil)
											])),
										A2(
										elm$svg$Svg$g,
										_List_Nil,
										function () {
											var _n0 = model.selected;
											if (_n0.$ === 'Just') {
												var val = _n0.a;
												return author$project$DonutChart$formatDisplay(
													A2(selectedTime, val, model.points));
											} else {
												return author$project$DonutChart$formatDisplay(model.displayTotal);
											}
										}())
									]))
							]))
					]))
			]));
};
var author$project$Page$onChange = function (handler) {
	return A2(
		elm$html$Html$Events$on,
		'change',
		A2(
			elm$json$Json$Decode$map,
			handler,
			A2(
				elm$json$Json$Decode$at,
				_List_fromArray(
					['target', 'value']),
				elm$json$Json$Decode$string)));
};
var author$project$Page$Timelogs$ChangeView = function (a) {
	return {$: 'ChangeView', a: a};
};
var author$project$Page$Timelogs$SetDate = function (a) {
	return {$: 'SetDate', a: a};
};
var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var elm$html$Html$map = elm$virtual_dom$VirtualDom$map;
var elm$html$Html$option = _VirtualDom_node('option');
var elm$html$Html$select = _VirtualDom_node('select');
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$selected = elm$html$Html$Attributes$boolProperty('selected');
var author$project$Page$Timelogs$filterLevel = function (_n0) {
	var timelogModel = _n0.timelogModel;
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('level')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('level-left')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('level-item')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$map,
								author$project$Page$Timelogs$DonutChartMsg,
								author$project$DonutChart$view(timelogModel.donutChartData))
							]))
					])),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('level-right')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('level-item')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('field')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$div,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('control has-icons-left')
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$input,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('input is-small'),
														elm$html$Html$Attributes$type_('date'),
														elm$html$Html$Events$onInput(author$project$Page$Timelogs$SetDate),
														elm$html$Html$Attributes$value(
														justinmimbs$date$Date$toIsoString(timelogModel.filterDate))
													]),
												_List_Nil),
												A2(
												elm$html$Html$span,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('icon is-small is-left')
													]),
												_List_fromArray(
													[
														A2(
														elm$html$Html$span,
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('fas fa-calendar')
															]),
														_List_Nil)
													]))
											]))
									]))
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('level-item')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('field')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$div,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('control has-icons-left')
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$div,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('select is-small')
													]),
												_List_fromArray(
													[
														A2(
														elm$html$Html$select,
														_List_fromArray(
															[
																author$project$Page$onChange(author$project$Page$Timelogs$ChangeView)
															]),
														_List_fromArray(
															[
																A2(
																elm$html$Html$option,
																_List_fromArray(
																	[
																		elm$html$Html$Attributes$value('week'),
																		elm$html$Html$Attributes$selected(
																		_Utils_eq(timelogModel.filterView, author$project$Types$Timelog$WeekView))
																	]),
																_List_fromArray(
																	[
																		elm$html$Html$text('Weekly')
																	])),
																A2(
																elm$html$Html$option,
																_List_fromArray(
																	[
																		elm$html$Html$Attributes$value('month'),
																		elm$html$Html$Attributes$selected(
																		_Utils_eq(timelogModel.filterView, author$project$Types$Timelog$MonthView))
																	]),
																_List_fromArray(
																	[
																		elm$html$Html$text('Monthly')
																	]))
															]))
													])),
												A2(
												elm$html$Html$span,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('icon is-small is-left')
													]),
												_List_fromArray(
													[
														A2(
														elm$html$Html$span,
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('fas fa-filter')
															]),
														_List_Nil)
													]))
											]))
									]))
							]))
					]))
			]));
};
var author$project$Page$Timelogs$formatDate = function (date) {
	return A2(justinmimbs$date$Date$format, 'E dd/MM/y', date);
};
var author$project$Page$Timelogs$rangeTitle = F2(
	function (filterDate, filterView) {
		if (filterView.$ === 'WeekView') {
			var _n1 = A2(author$project$Page$rangeFromDate, filterDate, filterView);
			var start = _n1.a;
			var end = _n1.b;
			return A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('column is-one-third-desktop is-three-fifth-mobile title is-size-6 has-text-centered')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text(
								author$project$Page$Timelogs$formatDate(start))
							])),
						A2(
						elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text(' - ')
							])),
						A2(
						elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text(
								author$project$Page$Timelogs$formatDate(end))
							]))
					]));
		} else {
			return A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('column is-one-third-desktop is-three-fifth-mobile title is-size-6 has-text-centered')
					]),
				_List_fromArray(
					[
						elm$html$Html$text(
						A2(justinmimbs$date$Date$format, 'MMMM y', filterDate))
					]));
		}
	});
var author$project$Page$Timelogs$dateFilter = F2(
	function (timelogs, key) {
		return A2(
			elm$core$List$filter,
			function (x) {
				return _Utils_eq(
					justinmimbs$date$Date$toIsoString(x.date),
					key);
			},
			timelogs);
	});
var author$project$Page$Timelogs$groupByDay = function (timeLogs) {
	var groupedList = elm$core$Set$fromList(
		A2(
			elm$core$List$map,
			function (x) {
				return justinmimbs$date$Date$toIsoString(x.date);
			},
			timeLogs));
	var nested = A2(
		elm$core$List$map,
		function (x) {
			return _Utils_Tuple2(
				x,
				A2(author$project$Page$Timelogs$dateFilter, timeLogs, x));
		},
		elm$core$Set$toList(groupedList));
	return nested;
};
var elm$html$Html$Attributes$title = elm$html$Html$Attributes$stringProperty('title');
var author$project$Page$Timelogs$actions = function (id) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('buttons')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$a,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('button'),
						elm$html$Html$Attributes$href(
						'/times/edit/' + danyx23$elm_uuid$Uuid$toString(id)),
						elm$html$Html$Attributes$title('Edit')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$span,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('fas fa-pen')
							]),
						_List_Nil)
					]))
			]));
};
var author$project$Page$Timelogs$timeLogView = F2(
	function (projects, timelog) {
		var newTimelog = A2(author$project$Page$Timelogs$mergeProjectWithTimelog, projects, timelog);
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('columns is-vcentered is-mobile')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('column is-narrow')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('project-color'),
											A2(elm$html$Html$Attributes$style, 'background-color', newTimelog.project.colour)
										]),
									_List_Nil)
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('column has-text-weight-bold is-size-5')
								]),
							_List_fromArray(
								[
									elm$html$Html$text(newTimelog.project.name)
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('column is-narrow')
								]),
							_List_fromArray(
								[
									author$project$Page$Timelogs$actions(newTimelog.id)
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('columns')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('column is-narrow has-text-weight-bold')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text(
											author$project$Utils$TimeDelta$toString(newTimelog.duration))
										]))
								])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('column')
								]),
							_List_fromArray(
								[
									elm$html$Html$text(newTimelog.description)
								]))
						]))
				]));
	});
var author$project$Page$Timelogs$groupByDayView = F3(
	function (today, projects, timeLogGroup) {
		var day = A2(
			elm$core$Maybe$withDefault,
			today,
			elm$core$Result$toMaybe(
				justinmimbs$date$Date$fromIsoString(timeLogGroup.a)));
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('columns groups')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('date-column column is-narrow')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('date-text has-text-weight-bold is-size-6')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text(
											A2(justinmimbs$date$Date$format, 'E ddd', day))
										]))
								]))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('column')
						]),
					A2(
						elm$core$List$map,
						function (x) {
							return A2(author$project$Page$Timelogs$timeLogView, projects, x);
						},
						timeLogGroup.b))
				]));
	});
var author$project$Page$Timelogs$timelogHero = function (message) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('hero is-large')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('hero-body')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('container')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$h1,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('title has-text-centered has-text-grey-lighter')
									]),
								_List_fromArray(
									[
										elm$html$Html$text(message)
									]))
							]))
					]))
			]));
};
var author$project$Page$Timelogs$timeLogList = function (model) {
	var timelogModel = model.timelogModel;
	var projectModel = model.projectModel;
	if (!timelogModel.readyTimes) {
		return author$project$Page$Timelogs$timelogHero('Loading');
	} else {
		if ((elm$core$Array$length(timelogModel.timelogs) > 0) && (!timelogModel.isPending)) {
			var groupedList = author$project$Page$Timelogs$groupByDay(
				elm$core$Array$toList(timelogModel.timelogs));
			return A2(
				elm$html$Html$div,
				_List_Nil,
				A2(
					elm$core$List$map,
					A2(
						author$project$Page$Timelogs$groupByDayView,
						model.today,
						elm$core$Array$toList(projectModel.projects)),
					groupedList));
		} else {
			return author$project$Page$Timelogs$timelogHero('Nothing to show');
		}
	}
};
var author$project$Page$Timelogs$view = function (model) {
	var timelogModel = model.timelogModel;
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('level is-mobile')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('level-left')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('level-item')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$h1,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('title')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Times')
											]))
									]))
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('level-right')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('level-item')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$a,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('button is-success'),
												elm$html$Html$Attributes$href('/times/add')
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$span,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('icon is-small')
													]),
												_List_fromArray(
													[
														A2(
														elm$html$Html$span,
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('fas fa-plus-circle')
															]),
														_List_Nil)
													])),
												A2(
												elm$html$Html$span,
												_List_Nil,
												_List_fromArray(
													[
														elm$html$Html$text('New')
													]))
											]))
									]))
							]))
					])),
				author$project$Page$Timelogs$filterLevel(model),
				A2(
				elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('columns is-mobile')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('column is-one-third-desktop is-one-fifth-mobile')
									]),
								_List_fromArray(
									[
										A2(author$project$Page$Timelogs$dateNavButton, author$project$Page$Left, timelogModel.filterView)
									])),
								A2(author$project$Page$Timelogs$rangeTitle, timelogModel.filterDate, timelogModel.filterView),
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('column is-one-third-desktop is-one-fifth-mobile')
									]),
								_List_fromArray(
									[
										A2(author$project$Page$Timelogs$dateNavButton, author$project$Page$Right, timelogModel.filterView)
									]))
							]))
					])),
				author$project$Page$Timelogs$timeLogList(model)
			]));
};
var author$project$Page$SelectOption = F2(
	function (value, title) {
		return {title: title, value: value};
	});
var author$project$Page$formSelect = F4(
	function (list, msg, value, inputLength) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('field')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$label,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('label')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$classList(
									_List_fromArray(
										[
											_Utils_Tuple2('control', true),
											_Utils_Tuple2(
											'is-expanded',
											author$project$Page$isFullwidth(inputLength))
										]))
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$classList(
											_List_fromArray(
												[
													_Utils_Tuple2('select', true),
													_Utils_Tuple2(
													'is-fullwidth',
													author$project$Page$isFullwidth(inputLength))
												]))
										]),
									_List_fromArray(
										[
											A2(
											elm$html$Html$select,
											_List_fromArray(
												[
													author$project$Page$onChange(msg)
												]),
											A2(
												elm$core$List$map,
												function (item) {
													var selected = function () {
														if (value.$ === 'Just') {
															var val = value.a;
															return _Utils_eq(val, item.value) ? true : false;
														} else {
															return false;
														}
													}();
													return A2(
														elm$html$Html$option,
														_List_fromArray(
															[
																elm$html$Html$Attributes$value(item.value),
																elm$html$Html$Attributes$selected(selected)
															]),
														_List_fromArray(
															[
																elm$html$Html$text(item.title)
															]));
												},
												A2(
													elm$core$List$cons,
													A2(author$project$Page$SelectOption, '', 'Please select...'),
													list)))
										]))
								]))
						]))
				]));
	});
var elm$html$Html$textarea = _VirtualDom_node('textarea');
var author$project$Page$formTextArea = F4(
	function (placeholder, msg, value, inputLength) {
		var content = function () {
			if (value.$ === 'Just') {
				var val = value.a;
				return elm$html$Html$text(val);
			} else {
				return elm$html$Html$text('');
			}
		}();
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('field')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$label,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('label')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$classList(
									_List_fromArray(
										[
											_Utils_Tuple2('control', true),
											_Utils_Tuple2(
											'is-expanded',
											author$project$Page$isFullwidth(inputLength))
										]))
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$textarea,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('textarea'),
											elm$html$Html$Attributes$placeholder(placeholder),
											elm$html$Html$Events$onInput(msg)
										]),
									_List_fromArray(
										[content]))
								]))
						]))
				]));
	});
var author$project$Page$Timelogs$AddTimelog$CancelAdd = {$: 'CancelAdd'};
var author$project$Page$Timelogs$AddTimelog$InputCreateTimelogDate = function (a) {
	return {$: 'InputCreateTimelogDate', a: a};
};
var author$project$Page$Timelogs$AddTimelog$InputCreateTimelogDescription = function (a) {
	return {$: 'InputCreateTimelogDescription', a: a};
};
var author$project$Page$Timelogs$AddTimelog$InputCreateTimelogDuration = function (a) {
	return {$: 'InputCreateTimelogDuration', a: a};
};
var author$project$Page$Timelogs$AddTimelog$InputCreateTimelogProject = function (a) {
	return {$: 'InputCreateTimelogProject', a: a};
};
var author$project$Page$Timelogs$AddTimelog$SubmitCreateTimelog = {$: 'SubmitCreateTimelog'};
var author$project$Page$Timelogs$AddTimelog$createTimelogForm = function (model) {
	var addTimelogModel = model.addTimelogModel;
	var projectModel = model.projectModel;
	var button = function () {
		var _n0 = addTimelogModel.isPending;
		if (_n0) {
			return A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('button is-primary is-loading'),
						A2(elm$html$Html$Attributes$attribute, 'disabled', 'disabled')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Submit')
					]));
		} else {
			return A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('button is-primary'),
						elm$html$Html$Events$onClick(author$project$Page$Timelogs$AddTimelog$SubmitCreateTimelog)
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Submit')
					]));
		}
	}();
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$h3,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('title')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Add')
					])),
				A4(author$project$Page$formTextArea, 'Description', author$project$Page$Timelogs$AddTimelog$InputCreateTimelogDescription, elm$core$Maybe$Nothing, author$project$Page$Full),
				A5(author$project$Page$formInput, 'date', 'Date', author$project$Page$Timelogs$AddTimelog$InputCreateTimelogDate, elm$core$Maybe$Nothing, author$project$Page$Full),
				A4(
				author$project$Page$formSelect,
				A2(
					elm$core$List$map,
					function (project) {
						return {
							title: project.name,
							value: danyx23$elm_uuid$Uuid$toString(project.id)
						};
					},
					elm$core$Array$toList(projectModel.projects)),
				author$project$Page$Timelogs$AddTimelog$InputCreateTimelogProject,
				elm$core$Maybe$Nothing,
				author$project$Page$Full),
				A5(author$project$Page$formInput, 'time', 'Duration', author$project$Page$Timelogs$AddTimelog$InputCreateTimelogDuration, elm$core$Maybe$Nothing, author$project$Page$Short),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('field')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('control')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('buttons')
									]),
								_List_fromArray(
									[
										button,
										A2(
										elm$html$Html$button,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('button is-text'),
												elm$html$Html$Events$onClick(author$project$Page$Timelogs$AddTimelog$CancelAdd)
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Cancel')
											]))
									]))
							]))
					]))
			]));
};
var author$project$Page$Timelogs$AddTimelog$view = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('level')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('level-left')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$h2,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('title')
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Times')
									]))
							]))
					])),
				author$project$Page$Timelogs$AddTimelog$createTimelogForm(model)
			]));
};
var author$project$Page$Timelogs$EditTimelog$CancelEdit = {$: 'CancelEdit'};
var author$project$Page$Timelogs$EditTimelog$DeleteTimelog = {$: 'DeleteTimelog'};
var author$project$Page$Timelogs$EditTimelog$CloseFormModal = {$: 'CloseFormModal'};
var author$project$Page$Timelogs$EditTimelog$SubmitDeleteTimelog = {$: 'SubmitDeleteTimelog'};
var author$project$Page$Timelogs$EditTimelog$deleteTimelogForm = function (model) {
	var editTimelogModel = model.editTimelogModel;
	var projectModel = model.projectModel;
	var button = function () {
		var _n0 = editTimelogModel.isPending;
		if (_n0) {
			return A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('button is-primary is-loading'),
						A2(elm$html$Html$Attributes$attribute, 'disabled', 'disabled')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Submit')
					]));
		} else {
			return A2(
				elm$html$Html$button,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('button is-primary'),
						elm$html$Html$Events$onClick(author$project$Page$Timelogs$EditTimelog$SubmitDeleteTimelog)
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Submit')
					]));
		}
	}();
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$h3,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('title')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Delete')
					])),
				A2(
				elm$html$Html$p,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('field')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Are you sure you want to delete this log?')
					])),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('field')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('control')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('buttons')
									]),
								_List_fromArray(
									[
										button,
										A2(
										elm$html$Html$button,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('button is-text'),
												elm$html$Html$Events$onClick(author$project$Page$Timelogs$EditTimelog$CloseFormModal)
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Cancel')
											]))
									]))
							]))
					]))
			]));
};
var author$project$Page$Timelogs$EditTimelog$InputUpdateTimelogDate = function (a) {
	return {$: 'InputUpdateTimelogDate', a: a};
};
var author$project$Page$Timelogs$EditTimelog$InputUpdateTimelogDescription = function (a) {
	return {$: 'InputUpdateTimelogDescription', a: a};
};
var author$project$Page$Timelogs$EditTimelog$InputUpdateTimelogDuration = function (a) {
	return {$: 'InputUpdateTimelogDuration', a: a};
};
var author$project$Page$Timelogs$EditTimelog$InputUpdateTimelogProject = function (a) {
	return {$: 'InputUpdateTimelogProject', a: a};
};
var author$project$Page$Timelogs$EditTimelog$SubmitEditTimelog = {$: 'SubmitEditTimelog'};
var author$project$Page$Timelogs$EditTimelog$updateTimelogForm = F2(
	function (form, model) {
		var editTimelogModel = model.editTimelogModel;
		var projectModel = model.projectModel;
		var button = function () {
			var _n0 = editTimelogModel.isPending;
			if (_n0) {
				return A2(
					elm$html$Html$button,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('button is-primary is-loading'),
							A2(elm$html$Html$Attributes$attribute, 'disabled', 'disabled')
						]),
					_List_fromArray(
						[
							elm$html$Html$text('Submit')
						]));
			} else {
				return A2(
					elm$html$Html$button,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('button is-primary'),
							elm$html$Html$Events$onClick(author$project$Page$Timelogs$EditTimelog$SubmitEditTimelog)
						]),
					_List_fromArray(
						[
							elm$html$Html$text('Submit')
						]));
			}
		}();
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$h3,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('title')
						]),
					_List_fromArray(
						[
							elm$html$Html$text('Update')
						])),
					A4(
					author$project$Page$formTextArea,
					'Description',
					author$project$Page$Timelogs$EditTimelog$InputUpdateTimelogDescription,
					elm$core$Maybe$Just(form.description),
					author$project$Page$Full),
					A5(
					author$project$Page$formInput,
					'date',
					'Date',
					author$project$Page$Timelogs$EditTimelog$InputUpdateTimelogDate,
					elm$core$Maybe$Just(
						justinmimbs$date$Date$toIsoString(form.date)),
					author$project$Page$Full),
					A4(
					author$project$Page$formSelect,
					A2(
						elm$core$List$map,
						function (project) {
							return {
								title: project.name,
								value: danyx23$elm_uuid$Uuid$toString(project.id)
							};
						},
						elm$core$Array$toList(projectModel.projects)),
					author$project$Page$Timelogs$EditTimelog$InputUpdateTimelogProject,
					elm$core$Maybe$Just(
						danyx23$elm_uuid$Uuid$toString(form.project)),
					author$project$Page$Full),
					A5(
					author$project$Page$formInput,
					'time',
					'Duration',
					author$project$Page$Timelogs$EditTimelog$InputUpdateTimelogDuration,
					elm$core$Maybe$Just(
						author$project$Utils$TimeDelta$toString(form.duration)),
					author$project$Page$Short),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('field')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class('control')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('buttons')
										]),
									_List_fromArray(
										[
											button,
											A2(
											elm$html$Html$button,
											_List_fromArray(
												[
													elm$html$Html$Attributes$class('button is-text'),
													elm$html$Html$Events$onClick(author$project$Page$Timelogs$EditTimelog$CancelEdit)
												]),
											_List_fromArray(
												[
													elm$html$Html$text('Cancel')
												]))
										]))
								]))
						]))
				]));
	});
var author$project$Page$Timelogs$EditTimelog$view = function (model) {
	var editTimelogModel = model.editTimelogModel;
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('level')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('level-left')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$h2,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('title')
									]),
								_List_fromArray(
									[
										elm$html$Html$text('Times')
									]))
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('level-right')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('level-item')
									]),
								_List_fromArray(
									[
										function () {
										var _n0 = editTimelogModel.updateForm;
										if (_n0.$ === 'Just') {
											var form = _n0.a;
											return A2(
												elm$html$Html$button,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('button is-danger'),
														elm$html$Html$Events$onClick(author$project$Page$Timelogs$EditTimelog$DeleteTimelog)
													]),
												_List_fromArray(
													[
														A2(
														elm$html$Html$span,
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('icon is-small')
															]),
														_List_fromArray(
															[
																A2(
																elm$html$Html$span,
																_List_fromArray(
																	[
																		elm$html$Html$Attributes$class('fas fa-times-circle')
																	]),
																_List_Nil)
															])),
														A2(
														elm$html$Html$span,
														_List_Nil,
														_List_fromArray(
															[
																elm$html$Html$text('Delete')
															]))
													]));
										} else {
											return A2(elm$html$Html$div, _List_Nil, _List_Nil);
										}
									}()
									]))
							]))
					])),
				function () {
				var _n1 = editTimelogModel.updateForm;
				if (_n1.$ === 'Just') {
					var form = _n1.a;
					return A2(author$project$Page$Timelogs$EditTimelog$updateTimelogForm, form, model);
				} else {
					var _n2 = editTimelogModel.isPending;
					if (!_n2) {
						return A2(
							elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									elm$html$Html$h3,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('title is-5 has-text-centered')
										]),
									_List_fromArray(
										[
											elm$html$Html$text('No time log to edit')
										]))
								]));
					} else {
						return A2(elm$html$Html$div, _List_Nil, _List_Nil);
					}
				}
			}(),
				A4(author$project$Page$modal, author$project$Page$Timelogs$EditTimelog$deleteTimelogForm, model, editTimelogModel.showModal, author$project$Page$Timelogs$EditTimelog$CancelEdit)
			]));
};
var author$project$Main$viewPage = function (model) {
	var currentRoute = author$project$Route$fromUrl(model.url);
	switch (currentRoute.$) {
		case 'TimelogsR':
			return A2(
				elm$html$Html$map,
				author$project$Main$TimelogMsg,
				author$project$Page$Timelogs$view(model));
		case 'AddTimelogR':
			return A2(
				elm$html$Html$map,
				author$project$Main$AddTimelogMsg,
				author$project$Page$Timelogs$AddTimelog$view(model));
		case 'EditTimelogR':
			var uuid = currentRoute.a;
			return A2(
				elm$html$Html$map,
				author$project$Main$EditTimelogMsg,
				author$project$Page$Timelogs$EditTimelog$view(model));
		case 'ProjectsR':
			return A2(
				elm$html$Html$map,
				author$project$Main$ProjectMsg,
				author$project$Page$Projects$view(model));
		case 'AddProjectR':
			return A2(
				elm$html$Html$map,
				author$project$Main$AddProjectMsg,
				author$project$Page$Projects$AddProject$view(model));
		case 'EditProjectR':
			var uuid = currentRoute.a;
			return A2(
				elm$html$Html$map,
				author$project$Main$EditProjectMsg,
				author$project$Page$Projects$EditProject$view(model));
		case 'ProfileR':
			return A2(
				elm$html$Html$map,
				author$project$Main$ProfileMsg,
				author$project$Page$Profile$view(model));
		default:
			return A2(elm$html$Html$div, _List_Nil, _List_Nil);
	}
};
var elm$html$Html$section = _VirtualDom_node('section');
var author$project$Main$view = function (model) {
	var currentRoute = author$project$Route$fromUrl(model.url);
	return {
		body: _List_fromArray(
			[
				author$project$Main$header(model),
				A2(
				elm$html$Html$section,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('section')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('container')
							]),
						_List_fromArray(
							[
								author$project$Main$viewPage(model)
							]))
					])),
				function () {
				var _n0 = model.errorMsg;
				if (_n0.$ === 'Just') {
					var errors = _n0.a;
					return author$project$Main$errorMessages(errors);
				} else {
					return A2(elm$html$Html$div, _List_Nil, _List_Nil);
				}
			}()
			]),
		title: author$project$Main$title(
			author$project$Route$fromUrl(model.url))
	};
};
var elm$browser$Browser$application = _Browser_application;
var author$project$Main$main = elm$browser$Browser$application(
	{init: author$project$Main$init, onUrlChange: author$project$Main$UrlChanged, onUrlRequest: author$project$Main$LinkClicked, subscriptions: author$project$Main$subscriptions, update: author$project$Main$update, view: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(
	A2(
		elm$json$Json$Decode$andThen,
		function (csrftoken) {
			return elm$json$Json$Decode$succeed(
				{csrftoken: csrftoken});
		},
		A2(elm$json$Json$Decode$field, 'csrftoken', elm$json$Json$Decode$string)))(0)}});}(this));