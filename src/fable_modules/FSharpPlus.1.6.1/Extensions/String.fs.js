import { Operators_NullArg } from "../../fable-library.4.1.4/FSharp.Core.js";
import { isNullOrEmpty, trimEnd as trimEnd_1, trimStart as trimStart_1, trim as trim_1, padRight as padRight_1, padLeft as padLeft_1, endsWith as endsWith_1, replace as replace_1, split as split_1, join } from "../../fable-library.4.1.4/String.js";
import { intersperse as intersperse_1 } from "./Seq.fs.js";
import { contains as contains_1, toArray as toArray_1 } from "../../fable-library.4.1.4/Seq.js";
import { stringHash } from "../../fable-library.4.1.4/Util.js";
import { toArray as toArray_2, ofArray as ofArray_1 } from "../../fable-library.4.1.4/List.js";
import { reverse } from "../../fable-library.4.1.4/Array.js";

/**
 * Concatenates all elements, using the specified separator between each element.
 */
export function intercalate(separator, source) {
    if (separator == null) {
        Operators_NullArg("separator");
    }
    if (source == null) {
        Operators_NullArg("source");
    }
    return join(separator, source);
}

/**
 * Inserts a separator char between each char in the source string.
 */
export function intersperse(element, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return join("", Array.from(intersperse_1(element, source.split(""))));
}

/**
 * Creates a sequence of strings by splitting the source string on any of the given separators.
 */
export function split(separators, source) {
    if (separators == null) {
        Operators_NullArg("separators");
    }
    if (source == null) {
        Operators_NullArg("source");
    }
    return split_1(source, toArray_1(separators), void 0, 0);
}

/**
 * Replaces a substring with the given replacement string.
 */
export function replace(oldValue, newValue, source) {
    if (oldValue == null) {
        Operators_NullArg("oldValue");
    }
    if (source == null) {
        Operators_NullArg("source");
    }
    if (oldValue.length === 0) {
        return source;
    }
    else {
        return replace_1(source, oldValue, newValue);
    }
}

/**
 * Does the source string contain the given subString? -- function wrapper for String.Contains method.
 */
export function isSubString(subString, source) {
    if (subString == null) {
        Operators_NullArg("subString");
    }
    if (source == null) {
        Operators_NullArg("source");
    }
    return source.indexOf(subString) >= 0;
}

/**
 * Does the source string end with the given subString? -- function wrapper for String.EndsWith method using InvariantCulture.
 */
export function endsWith(subString, source) {
    if (subString == null) {
        Operators_NullArg("subString");
    }
    if (source == null) {
        Operators_NullArg("source");
    }
    return endsWith_1(source, subString, false, {});
}

/**
 * Does the source string contain the given character?
 * Use `String.isSubstring` to check for strings.
 */
export function contains(char, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return contains_1(char, source.split(""), {
        Equals: (x, y) => (x === y),
        GetHashCode: stringHash,
    });
}

/**
 * Converts to uppercase -- nullsafe function wrapper for String.ToUpperInvariant method.
 */
export function toUpper(source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    if (source == null) {
        return source;
    }
    else {
        return source.toUpperCase();
    }
}

/**
 * Converts to lowercase -- nullsafe function wrapper for String.ToLowerInvariant method.
 */
export function toLower(source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    if (source == null) {
        return source;
    }
    else {
        return source.toLowerCase();
    }
}

/**
 * Trims leading and trailing white spaces -- function wrapper for String.Trim method.
 * 
 * Note this is distinct from trim which trims the given characters,
 * not white spaces.
 */
export function trimWhiteSpaces(source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return source.trim();
}

/**
 * Trims leading white spaces -- function wrapper for String.TrimStart method.
 * 
 * Note this is distinct from trim which trims the given characters,
 * not white spaces.
 */
export function trimStartWhiteSpaces(source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return source.trimStart();
}

/**
 * Trims trailing white spaces -- function wrapper for String.TrimEnd method.
 * 
 * Note this is distinct from trim which trims the given characters,
 * not white spaces.
 */
export function trimEndWhiteSpaces(source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return source.trimEnd();
}

/**
 * Pads the beginning of the given string with spaces so that it has a specified total length.
 */
export function padLeft(totalLength, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return padLeft_1(source, totalLength);
}

/**
 * Pads the beginning of the given string with a specified character so that it has a specified total length.
 */
export function padLeftWith(totalLength, paddingChar, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return padLeft_1(source, totalLength, paddingChar);
}

/**
 * Pads the end of the given string with spaces so that it has a specified total length.
 */
export function padRight(totalLength, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return padRight_1(source, totalLength);
}

/**
 * Pads the end of the given string with a specified character so that it has a specified total length.
 */
export function padRightWith(totalLength, paddingChar, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return padRight_1(source, totalLength, paddingChar);
}

/**
 * Removes all leading and trailing occurrences of specified characters from the given string.
 */
export function trim(trimChars, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return trim_1(source, ...toArray_1(trimChars));
}

/**
 * Removes all leading occurrences of specified characters from the given string.
 */
export function trimStart(trimChars, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return trimStart_1(source, ...toArray_1(trimChars));
}

/**
 * Removes all trailing occurrences of specified characters from the given string.
 */
export function trimEnd(trimChars, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return trimEnd_1(source, ...toArray_1(trimChars));
}

/**
 * Converts the given string to an array of chars.
 */
export function toArray(source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return source.split("");
}

/**
 * Converts an array of chars to a String.
 */
export function ofArray(source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return source.join('');
}

/**
 * Converts the given string to a list of chars.
 */
export function toList(source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return ofArray_1(toArray(source));
}

/**
 * Converts a list of chars to a String.
 */
export function ofList(source) {
    return toArray_2(source).join('');
}

/**
 * Converts the given string to a seq of chars.
 */
export function toSeq(source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return source.split("");
}

/**
 * Converts a seq of chars to a String.
 */
export function ofSeq(source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return join("", source);
}

/**
 * (Unsafely) Returns the char at the given index in the source string.
 * 
 * This is a function wrapper for `source.[index]` method.
 * 
 * Note: this is not exception safe, and will throw System.IndexOutOfRangeException when
 * the given index is out of bounds.
 */
export function item(index, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return source[index];
}

/**
 * Returns the char (as an Option) at the given index in the source string,
 * returning `None` if out of bounds.
 */
export function tryItem(index, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    if ((index >= 0) && (index < source.length)) {
        return source[index];
    }
    else {
        return void 0;
    }
}

/**
 * Reverses the given string.
 */
export function rev(source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return reverse(source.split("")).join('');
}

/**
 * (Unsafely) Takes the first count chars in the string.
 * Use `String.truncate` for a safe version.
 * 
 * Note: will throw System.ArgumentOutOfRangeException if you try to take more than the
 * number of chars in the string.
 */
export function take(count, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return source.slice(void 0, (count - 1) + 1);
}

/**
 * (Unsafely) Skips over the first count chars in the string.
 * Use `String.drop` for a safe version.
 * 
 * Note: will throw System.ArgumentOutOfRangeException if you try to skip more than the
 * number of chars in the string.
 */
export function skip(count, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    return source.slice(count, source.length);
}

/**
 * Takes chars from the source string while the given predicate is true.
 */
export function takeWhile(predicate, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    if (isNullOrEmpty(source)) {
        return "";
    }
    else {
        let i = 0;
        const length = source.length | 0;
        while ((i < length) && predicate(source[i])) {
            i = ((i + 1) | 0);
        }
        if (i === 0) {
            return "";
        }
        else {
            return take(i, source);
        }
    }
}

/**
 * Skips over chars from the source string while the given predicate is true.
 */
export function skipWhile(predicate, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    if (isNullOrEmpty(source)) {
        return "";
    }
    else {
        let i = 0;
        const length = source.length | 0;
        while ((i < length) && predicate(source[i])) {
            i = ((i + 1) | 0);
        }
        if (i === 0) {
            return "";
        }
        else {
            return skip(i, source);
        }
    }
}

/**
 * Gets the first char of the string, or
 * <c>None</c> if the string is empty.
 */
export function tryHead(source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    if (source.length === 0) {
        return void 0;
    }
    else {
        return source[0];
    }
}

/**
 * Gets the last char of the string, or
 * <c>None</c> if the string is empty.
 */
export function tryLast(source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    const length = source.length | 0;
    if (length === 0) {
        return void 0;
    }
    else {
        return source[length - 1];
    }
}

/**
 * Returns a string that has at most N characters from the beginning of the original string.
 * It returns the original string if it is shorter than count.
 */
export function truncate(count, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    if (count < 1) {
        return "";
    }
    else if (source.length <= count) {
        return source;
    }
    else {
        return take(count, source);
    }
}

/**
 * Returns a string that drops first N characters of the original string.
 * When count exceeds the length of the string it returns an empty string.
 */
export function drop(count, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    if (count < 1) {
        return source;
    }
    else if (source.length <= count) {
        return "";
    }
    else {
        return skip(count, source);
    }
}

/**
 * Finds the first index of the char in the substring which satisfies the given predicate.
 * 
 * Note: throws an ArgumentException when not found.
 */
export function findIndex(predicate, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    const go = (index_mut) => {
        go:
        while (true) {
            const index = index_mut;
            if (index >= source.length) {
                throw new Error("An index satisfying the predicate was not found in the string.");
            }
            else if (predicate(source[index])) {
                return index | 0;
            }
            else {
                index_mut = (index + 1);
                continue go;
            }
            break;
        }
    };
    return go(0) | 0;
}

/**
 * Tries to find the first index of the char in the substring which satisfies the given predicate.
 */
export function tryFindIndex(predicate, source) {
    if (source == null) {
        Operators_NullArg("source");
    }
    const go = (index_mut) => {
        go:
        while (true) {
            const index = index_mut;
            if (index >= source.length) {
                return void 0;
            }
            else if (predicate(source[index])) {
                return index;
            }
            else {
                index_mut = (index + 1);
                continue go;
            }
            break;
        }
    };
    return go(0);
}

/**
 * Returns the index of the first occurrence of the specified slice in the source.
 */
export function findSliceIndex(slice, source) {
    if (slice == null) {
        Operators_NullArg("slice");
    }
    if (source == null) {
        Operators_NullArg("source");
    }
    const index = source.indexOf(slice) | 0;
    if (index === -1) {
        throw new Error("The specified substring was not found in the string.");
    }
    else {
        return index | 0;
    }
}

/**
 * Returns the index of the last occurrence of the specified slice in the source.
 */
export function findLastSliceIndex(slice, source) {
    const index = source.lastIndexOf(slice) | 0;
    if (index === -1) {
        throw new Error("The specified substring was not found in the string.");
    }
    else {
        return index | 0;
    }
}

/**
 * Returns the index of the first occurrence of the specified slice in the source.
 * Returns <c>None</c> if not found.
 */
export function tryFindSliceIndex(slice, source) {
    if (slice == null) {
        Operators_NullArg("slice");
    }
    if (source == null) {
        Operators_NullArg("source");
    }
    const index = source.indexOf(slice) | 0;
    if (index === -1) {
        return void 0;
    }
    else {
        return index;
    }
}

/**
 * Returns the index of the last occurrence of the specified slice in the source.
 * Returns <c>None</c> if not found.
 */
export function tryFindLastSliceIndex(slice, source) {
    const index = source.lastIndexOf(slice) | 0;
    if (index === -1) {
        return void 0;
    }
    else {
        return index;
    }
}

/**
 * Converts a string to a byte-array using the specified encoding.
 */
export function getBytes(encoding, source) {
    if (encoding == null) {
        Operators_NullArg("encoding");
    }
    if (source == null) {
        Operators_NullArg("source");
    }
    return encoding.getBytes(source);
}

