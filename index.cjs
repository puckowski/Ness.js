const fs = require('fs');

const countSubstr = (string, word) => {
    return string.split(word).length - 1;
}

function removeQuotedData(string) {
    let data = '';
    let openedDouble = false;
    let opened = false;
    let previousEscape = false;

    for (let i = 0; i < string.length; ++i) {
        if (string[i] === '"' && !opened && !openedDouble) {
            openedDouble = true;
        } else if (string[i] === '\'' && !opened && !openedDouble) {
            opened = true;
        } else if (string[i] === '"' && openedDouble && !previousEscape) {
            opened = false;
            openedDouble = false;
        } else if (string[i] === '\'' && opened && !previousEscape) {
            opened = false;
            openedDouble = false;
        } else if (string[i] === '"' && openedDouble && previousEscape) {
            previousEscape = false;
        } else if (string[i] === '\'' && opened && previousEscape) {
            previousEscape = false;
        } else {
            if (string[i] === '\\') {
                previousEscape = true;
            } else {
                previousEscape = false;
            }

            if (!opened && !openedDouble) {
                data += string[i];
            }
        }
    }
    return data;
}

function removeComments(string) {
    let data = '';
    let openedDouble = false;
    let opened = false;
    let previousEscape = false;

    let openedSlash = false;
    let previousStar = false;
    let openComment = false;
    let closedComment = false;

    for (let i = 0; i < string.length; ++i) {
        if (string[i] === '"' && !opened && !openedDouble) {
            openedDouble = true;
        } else if (string[i] === '\'' && !opened && !openedDouble) {
            opened = true;
        } else if (string[i] === '"' && openedDouble && !previousEscape) {
            opened = false;
            openedDouble = false;
        } else if (string[i] === '\'' && opened && !previousEscape) {
            opened = false;
            openedDouble = false;
        } else if (string[i] === '"' && openedDouble && previousEscape) {
            previousEscape = false;
        } else if (string[i] === '\'' && opened && previousEscape) {
            previousEscape = false;
        } else {
            if (string[i] === '\\') {
                previousEscape = true;
            } else {
                previousEscape = false;
            }
        }

        if (openComment || (!opened && !openedDouble)) {
            if (string[i] === '/' && !openedSlash) {
                openedSlash = true;
            } else if (string[i] !== '*') {
                openedSlash = false;
            }

            if (string[i] === '/' && openComment && previousStar) {
                openComment = false;
                closedComment = true;
            }

            if (string[i] === '*' && openedSlash) {
                data = data.substring(0, data.length - 1);
                openComment = true;
                openedSlash = false;
            } else if (string[i] === '*' && !openedSlash && openComment) {
                previousStar = true;
            } else {
                previousStar = false;
            }
        }

        if (!openComment && !closedComment) {
            data += string[i];
        }

        closedComment = false;
    }
    return data;
}

function seekToFirstUnquotedSemicolon(string, charToSeek, startIndex = 0) {
    let data = '';
    let openedDouble = false;
    let opened = false;
    let previousEscape = false;

    for (let i = startIndex; i < string.length; ++i) {
        if (string[i] === '"' && !opened && !openedDouble) {
            openedDouble = true;
        } else if (string[i] === '\'' && !opened && !openedDouble) {
            opened = true;
        } else if (string[i] === '"' && openedDouble && !previousEscape) {
            opened = false;
            openedDouble = false;
        } else if (string[i] === '\'' && opened && !previousEscape) {
            opened = false;
            openedDouble = false;
        } else if (string[i] === '"' && openedDouble && previousEscape) {
            previousEscape = false;
        } else if (string[i] === '\'' && opened && previousEscape) {
            previousEscape = false;
        } else {
            if (string[i] === '\\') {
                previousEscape = true;
            } else {
                previousEscape = false;
            }
        }

        if (!opened && !openedDouble) {
            data += string[i];
        }

        if (string[i] === charToSeek && !openedDouble && !opened) {
            break;
        }
    }

    return data;
}

function seekToFirstUnquotedSemicolonPreserving(string, charToSeek, startIndex = 0) {
    let data = '';
    let openedDouble = false;
    let opened = false;
    let previousEscape = false;

    for (let i = startIndex; i < string.length; ++i) {
        if (string[i] === '"' && !opened && !openedDouble) {
            openedDouble = true;
        } else if (string[i] === '\'' && !opened && !openedDouble) {
            opened = true;
        } else if (string[i] === '"' && openedDouble && !previousEscape) {
            opened = false;
            openedDouble = false;
        } else if (string[i] === '\'' && opened && !previousEscape) {
            opened = false;
            openedDouble = false;
        } else if (string[i] === '"' && openedDouble && previousEscape) {
            previousEscape = false;
        } else if (string[i] === '\'' && opened && previousEscape) {
            previousEscape = false;
        } else {
            if (string[i] === '\\') {
                previousEscape = true;
            } else {
                previousEscape = false;
            }
        }

        data += string[i];

        if (string[i] === charToSeek && !openedDouble && !opened) {
            break;
        }
    }

    return data;
}

function seekToFirstUnquotedWord(string, wordToSeek, startIndex = 0) {
    let data = '';
    let openedDouble = false;
    let opened = false;
    let previousEscape = false;

    for (let i = startIndex; i < string.length; ++i) {
        if (string[i] === '"' && !opened && !openedDouble) {
            openedDouble = true;
        } else if (string[i] === '\'' && !opened && !openedDouble) {
            opened = true;
        } else if (string[i] === '"' && openedDouble && !previousEscape) {
            opened = false;
            openedDouble = false;
        } else if (string[i] === '\'' && opened && !previousEscape) {
            opened = false;
            openedDouble = false;
        } else if (string[i] === '"' && openedDouble && previousEscape) {
            previousEscape = false;
        } else if (string[i] === '\'' && opened && previousEscape) {
            previousEscape = false;
        } else {
            if (string[i] === '\\') {
                previousEscape = true;
            } else {
                previousEscape = false;
            }
        }

        data += string[i];

        if (string[i] === wordToSeek[0] && !openedDouble && !opened) {
            let match = true;

            for (let n = 0; n < wordToSeek.length; ++n) {
                if (string.length > i + n && string[i + n] !== wordToSeek[n]) {
                    match = false;
                } else if (string.length <= i + n) {
                    match = false;
                }
            }

            if (match) {
                break;
            }
        }
    }

    return data;
}

const trimRules = (rules) => {
    for (let i = 0; i < rules.length; ++i) {
        if (rules[i] === undefined) {
            continue;
        } else if (Array.isArray(rules[i])) {
            for (let n = 0; n < rules[i].length; ++n) {
                if (Array.isArray(rules[i][n])) {
                    trimRules(rules[i][n]);
                } else {
                    rules[i][n] = rules[i][n].trim();
                }
            }
        } else {
            rules[i] = rules[i].trim();
        }
    }
}

const applyScopedCss = (cssText) => {
    let finalCss = '';
    cssText = removeComments(cssText);

    const whitespaceStartPattern = /^\s/g;
    const whitespacePattern = /[^\s]*\s/;

    while (cssText.length > 0) {
        let data = seekToFirstUnquotedSemicolonPreserving(cssText, '}');

        if (data.trim().startsWith('@keyframes')) {
            let keyframeCss = seekToFirstUnquotedSemicolonPreserving(cssText, '}');
            let unquotedKeyframeCss = removeQuotedData(keyframeCss);

            let cssList = [keyframeCss];
            let combinedCss;

            while (countSubstr(unquotedKeyframeCss, '{') !== countSubstr(unquotedKeyframeCss, '}')) {
                combinedCss = '';
                cssList.forEach(css => combinedCss += css);
                keyframeCss = seekToFirstUnquotedSemicolonPreserving(cssText, '}', combinedCss.length);
                cssList.push(keyframeCss);
                combinedCss = '';
                cssList.forEach(css => combinedCss += css);
                unquotedKeyframeCss = removeQuotedData(combinedCss);
            }

            combinedCss = '';
            cssList.forEach(css => combinedCss += css);

            cssText = cssText.substring(combinedCss.length, cssText.length);

            finalCss += combinedCss.trim() + '\n';
            data = seekToFirstUnquotedSemicolonPreserving(cssText, '}');
        }

        let dataMinusQuoted = removeQuotedData(data);

        while (countSubstr(dataMinusQuoted, '{') !== countSubstr(dataMinusQuoted, '}')) {
            let newData = seekToFirstUnquotedSemicolonPreserving(cssText, '}', data.length);
            data += newData;
            dataMinusQuoted = removeQuotedData(data);

            if (newData === '') {
                break;
            }
        }

        let selectorStack = [];
        const rules = [];
        let index = 0;
        let cachedSelector;

        if (countSubstr(dataMinusQuoted, '{') > 1) {
            const origData = data;
            let offsetMap = new Map();
            let appendMap = new Map();

            while (removeQuotedData(data).includes('{')) {
                let toFirstBrace = seekToFirstUnquotedSemicolonPreserving(data, '{');
                let toFirstBraceUnquoted = removeQuotedData(toFirstBrace);
                let addedUnclosedRule = false;

                data = data.substring(toFirstBrace.length, data.length);

                if (toFirstBraceUnquoted.includes('}') && !toFirstBraceUnquoted.includes(';')) {
                    let rulesToAdd = seekToFirstUnquotedSemicolon(toFirstBrace, '}');

                    toFirstBrace = toFirstBrace.substring(rulesToAdd.length, toFirstBrace.length);

                    const lastBrace = rulesToAdd.lastIndexOf('}');
                    rulesToAdd = rulesToAdd.substring(0, lastBrace);
                    rulesToAdd = rulesToAdd.trim() + ';';

                    rules[index].push(rulesToAdd);
                    addedUnclosedRule = true;
                }

                let toFirstUnquotedTemp = toFirstBraceUnquoted;

                let idxMod = 0;
                let origIndex = index;

                if (!toFirstBraceUnquoted.includes(';')) {
                    let trimmed = toFirstBrace.trim();

                    if (trimmed.endsWith('{')) {
                        toFirstBrace = trimmed.substring(0, trimmed.length - 1);
                    }
                }

                while (toFirstBraceUnquoted.includes(';')) {
                    const origMod = idxMod;
                    index -= idxMod;
                    idxMod = 0;

                    let rulesNext = '';

                    while (removeQuotedData(toFirstBrace).includes(';')) {
                        const rule = seekToFirstUnquotedSemicolonPreserving(toFirstBrace, ';');
                        toFirstBrace = toFirstBrace.substring(rule.length, toFirstBrace.length);
                        rulesNext += ' ' + rule;
                    }

                    let nextUnquoted = removeQuotedData(rulesNext);

                    while (nextUnquoted.includes('}')) {
                        let dataTmp = seekToFirstUnquotedSemicolonPreserving(rulesNext, '}');
                        let before = rulesNext.substring(0, dataTmp.length - 1);
                        let after = rulesNext.substring(dataTmp.length, rulesNext.length);

                        rulesNext = before;
                        toFirstBrace = after + toFirstBrace;

                        nextUnquoted = removeQuotedData(rulesNext);

                        idxMod++;
                    }

                    toFirstBraceUnquoted = removeQuotedData(toFirstBrace);

                    if (toFirstBraceUnquoted.includes('}') && !toFirstBraceUnquoted.includes(';')) {
                        let rulesToAdd = seekToFirstUnquotedSemicolon(toFirstBrace, '}');

                        const lastBrace = rulesToAdd.lastIndexOf('}');

                        toFirstBrace = toFirstBrace.substring(lastBrace, toFirstBrace.length);
                        rulesToAdd = rulesToAdd.substring(0, lastBrace);

                        if (rulesToAdd.trim() !== '') {
                            rulesToAdd = rulesToAdd.trim() + ';';

                            rulesNext += ' ' + rulesToAdd;
                        }
                    }

                    if (!addedUnclosedRule || addedUnclosedRule && rulesNext !== '') {
                        if (origMod === 0) {
                            if (rules[index] !== undefined) {
                                if (Array.isArray(rules[index])) {
                                    if (!appendMap.has(index)) appendMap.set(index, rules[index].length);
                                    rules[index] = [...rules[index], rulesNext];
                                } else {
                                    if (!appendMap.has(index)) appendMap.set(index, 0);
                                    rules[index] = [rules[index], rulesNext];
                                }
                            } else {
                                if (!appendMap.has(index)) appendMap.set(index, 0);
                                rules[index] = rulesNext;
                            }
                        } else {
                            if (rules[index] !== undefined) {
                                if (typeof selectorStack[index] === 'string') {
                                    if (!appendMap.has(index)) appendMap.set(index, 0);
                                    rules[index] = rules[index] + ' ' + rulesNext;
                                } else {
                                    if (Array.isArray(rules[index])) {
                                        const unquotedData = removeQuotedData(data);
                                        let indexSemi = unquotedData.indexOf(';');
                                        let indexBrace = unquotedData.indexOf('{');
                                        if (indexSemi === -1) {
                                            indexSemi = unquotedData.length;
                                        }
                                        if (indexBrace === -1) {
                                            indexBrace = unquotedData.length;
                                        }

                                        if (Array.isArray(selectorStack[index]) && selectorStack[index].length > rules[index].length && indexSemi < indexBrace) {
                                            let arr = rules[index];
                                            arr[appendMap.get(index)] = arr[appendMap.get(index)] + ' ' + rulesNext;
                                            rules[index] = arr;
                                        } else {
                                            let arr = rules[index];
                                            arr[offsetMap.get(index)] = arr[offsetMap.get(index)] + ' ' + rulesNext;
                                            rules[index] = arr;
                                        }
                                    } else {
                                        if (!appendMap.has(index)) appendMap.set(index, 0);
                                        rules[index] = rules[index] + ' ' + rulesNext;
                                    }
                                }
                            } else {
                                if (!appendMap.has(index)) appendMap.set(index, 0);
                                rules[index] = rulesNext;
                            }
                        }
                    }

                    if (idxMod === 0) {
                        let trimmed = toFirstBrace.trim();

                        if (trimmed.endsWith('{')) {
                            toFirstBrace = trimmed.substring(0, trimmed.length - 1);
                        }
                    }

                    toFirstBraceUnquoted = removeQuotedData(toFirstBrace);
                }

                index = origIndex;
                let modCount = 0;

                while (toFirstUnquotedTemp.includes('}')) {
                    toFirstUnquotedTemp = toFirstUnquotedTemp.substring(toFirstUnquotedTemp.indexOf('}') + 1, toFirstUnquotedTemp.length);

                    index--;
                    modCount++;
                }

                while (toFirstUnquotedTemp.includes('{')) {
                    toFirstUnquotedTemp = toFirstUnquotedTemp.substring(toFirstUnquotedTemp.indexOf('{') + 1, toFirstUnquotedTemp.length);
                    index++;

                    if (modCount === 0) {
                        let origLen = 0;

                        if (selectorStack[index - 1] !== undefined) {
                            if (Array.isArray(selectorStack[index - 1])) {
                                let len = selectorStack[index - 1].length;

                                if (!Array.isArray(selectorStack[index])) {
                                    selectorStack[index] = [];
                                }

                                if (selectorStack[index - 1] !== undefined && Array.isArray(selectorStack[index - 1])) offsetMap.set(index - 1, selectorStack[index - 1].length - 1);
                                if (selectorStack[index].length === 0) {
                                    while (len > selectorStack[index].length) {
                                        selectorStack[index].unshift('');
                                    }
                                } else {
                                    origLen = selectorStack[index].length;
                                    while (len > selectorStack[index].length) {
                                        selectorStack[index].push('');
                                    }
                                }
                            } else {
                                if (selectorStack[index] === undefined) {
                                    selectorStack[index] = [''];
                                } else if (Array.isArray(selectorStack[index])) {
                                    selectorStack[index].unshift('');
                                } else if (!Array.isArray(selectorStack[index])) {
                                    selectorStack[index] = ['', selectorStack[index]];
                                } if (selectorStack[index - 1] !== undefined && Array.isArray(selectorStack[index - 1])) offsetMap.set(index - 1, selectorStack[index - 1].length - 1);
                            }
                        } else {
                            if (selectorStack[index] === undefined) {
                                selectorStack[index] = [''];
                            } else if (Array.isArray(selectorStack[index])) {
                                selectorStack[index].unshift('');
                            } else if (!Array.isArray(selectorStack[index])) {
                                selectorStack[index] = ['', selectorStack[index]];
                            } if (selectorStack[index - 1] !== undefined && Array.isArray(selectorStack[index - 1])) offsetMap.set(index - 1, selectorStack[index - 1].length - 1);
                        }

                        if (rules[index - 1] !== undefined) {
                            if (Array.isArray(rules[index - 1])) {
                                let len = selectorStack[index].length;

                                if (!Array.isArray(rules[index])) {
                                    rules[index] = [];
                                }

                                if (origLen === 0) {
                                    while (len > rules[index].length) {
                                        rules[index].unshift('');
                                    }
                                } else {
                                    while (len > rules[index].length) {
                                        rules[index].push('');
                                    }
                                }
                            } else {
                                if (rules[index] === undefined) {
                                    rules[index] = [''];
                                } else if (Array.isArray(rules[index])) {
                                    rules[index].unshift('');
                                } else if (!Array.isArray(rules[index])) {
                                    rules[index] = ['', rules[index]];
                                }
                            }
                        } else {
                            if (rules[index] === undefined) {
                                rules[index] = [''];
                            } else if (Array.isArray(rules[index])) {
                                rules[index].unshift('');
                            } else if (!Array.isArray(rules[index])) {
                                rules[index] = ['', rules[index]];
                            }
                        }
                    } else {
                        modCount--;
                    }
                }

                if (selectorStack[index] !== undefined) {
                    if (typeof selectorStack[index] === 'string') {
                        selectorStack[index] = [selectorStack[index], toFirstBrace];
                        const stoIndex = index;
                        while (index >= 0) {
                            while (selectorStack[index - 1] !== undefined && Array.isArray(selectorStack[index - 1]) && selectorStack[index - 1].length < selectorStack[index].length) {
                                selectorStack[index - 1].push(selectorStack[index - 1][selectorStack[index - 1].length - 1]); while (rules[index - 1].length < selectorStack[index - 1].length) rules[index - 1].push('');
                            }
                            index--;
                        }
                        index = stoIndex;
                    } else {
                        selectorStack[index] = [...selectorStack[index], toFirstBrace];
                        const stoIndex = index;
                        while (index >= 0) {
                            while (selectorStack[index - 1] !== undefined && Array.isArray(selectorStack[index - 1]) && selectorStack[index - 1].length < selectorStack[index].length) {
                                selectorStack[index - 1].push(selectorStack[index - 1][selectorStack[index - 1].length - 1]); while (rules[index - 1].length < selectorStack[index - 1].length) rules[index - 1].push('');
                            }
                            index--;
                        }
                        index = stoIndex;
                    }
                } else {
                    if (index > 1 && selectorStack[index - 1] !== undefined && Array.isArray(selectorStack[index - 1])) {
                        selectorStack[index] = [];
                        for (let fix = 0; fix < selectorStack[index - 1].length - 1; ++fix) {
                            selectorStack[index].push('');
                        }
                        selectorStack[index].push(toFirstBrace);

                        rules[index] = [];
                        for (let fix = 0; fix < selectorStack[index - 1].length - 1; ++fix) {
                            rules[index].push('');
                        }
                    } else {
                        toDupCount = 0;
                        selectorStack[index] = toFirstBrace;
                        insertedNonArray = true;
                    }
                }
            }

            let idxMod = 0;

            let lastIndex = rules.length - 1;
            for (let fix = lastIndex; fix >= 1; --fix) {
                const preList = rules[fix - 1];

                if (preList === undefined) {
                    continue;
                }

                const list = rules[fix];

                while (Array.isArray(preList) && Array.isArray(list) && preList.length < list.length) {
                    preList.push('');
                }

                rules[fix - 1] = preList;
            }

            while (removeQuotedData(data).includes(';')) {
                const origMod = idxMod;
                index -= idxMod;
                idxMod = 0;

                let rulesNext = '';

                while (data.includes(';')) {
                    const rule = seekToFirstUnquotedSemicolonPreserving(data, ';');
                    data = data.substring(rule.length, data.length);
                    rulesNext += ' ' + rule;
                }

                let nextUnquoted = removeQuotedData(rulesNext);

                while (nextUnquoted.includes('}')) {
                    let dataTmp = seekToFirstUnquotedSemicolonPreserving(rulesNext, '}');
                    let before = rulesNext.substring(0, dataTmp.length - 1);
                    let after = rulesNext.substring(dataTmp.length, rulesNext.length);

                    data = after + data;
                    rulesNext = before;

                    idxMod++;

                    nextUnquoted = removeQuotedData(rulesNext);
                }

                if (origMod === 0) {
                    if (rules[index] !== undefined) {
                        if (typeof selectorStack[index] === 'string') {
                            if (!appendMap.has(index)) appendMap.set(index, 0);
                            rules[index] = [rules[index], rulesNext];
                        } else {
                            if (Array.isArray(rules[index])) {
                                if (!appendMap.has(index)) appendMap.set(index, rules[index].length);
                                rules[index] = [...rules[index], rulesNext];
                            } else {
                                if (!appendMap.has(index)) appendMap.set(index, 0);
                                rules[index] = [rules[index], rulesNext];
                            }
                        }
                    } else {
                        if (!appendMap.has(index)) appendMap.set(index, 0);
                        rules[index] = rulesNext;
                    }
                } else {
                    if (rules[index] !== undefined) {
                        if (typeof selectorStack[index] === 'string') {
                            if (!appendMap.has(index)) appendMap.set(index, 0);
                            rules[index] = rules[index] + ' ' + rulesNext;
                        } else {
                            if (Array.isArray(rules[index])) {
                                const unquotedData = removeQuotedData(data);
                                let indexSemi = unquotedData.indexOf(';');
                                let indexBrace = unquotedData.indexOf('{');
                                if (indexSemi === -1) {
                                    indexSemi = unquotedData.length;
                                }
                                if (indexBrace === -1) {
                                    indexBrace = unquotedData.length;
                                }

                                if (Array.isArray(selectorStack[index]) && selectorStack[index].length > rules[index].length && indexSemi < indexBrace) {
                                    let arr = rules[index];
                                    arr[appendMap.get(index)] = arr[appendMap.get(index)] + ' ' + rulesNext;
                                    rules[index] = arr;
                                } else {
                                    let arr = rules[index];
                                    arr[offsetMap.get(index)] = arr[offsetMap.get(index)] + ' ' + rulesNext;
                                    rules[index] = arr;
                                }
                            } else {
                                if (!appendMap.has(index)) appendMap.set(index, 0);
                                rules[index] = rules[index] + ' ' + rulesNext;
                            }
                        }
                    } else {
                        if (!appendMap.has(index)) appendMap.set(index, 0);
                        rules[index] = rulesNext;
                    }
                }
            }

            if (data.length > 0 && removeQuotedData(data).includes('}')) {
                let ruleToAdd = seekToFirstUnquotedSemicolon(data, '}');
                const lastBrace = ruleToAdd.lastIndexOf('}');
                ruleToAdd = ruleToAdd.substring(0, lastBrace);
                ruleToAdd = ruleToAdd.trim() + ';';
                rules[index].push(ruleToAdd);
            }

            trimRules(rules);

            cssText = cssText.substring(origData.length, cssText.length);

            let lastSelector;

            for (let i = 0; i < selectorStack.length; ++i) {
                if (selectorStack[i] === undefined) {
                    continue;
                } else if (Array.isArray(selectorStack[i])) {
                    for (let n = 0; n < selectorStack[i].length; ++n) {
                        let unquoted = removeQuotedData(selectorStack[i][n]);

                        do {
                            if (unquoted.includes('}')) {
                                let sel = seekToFirstUnquotedSemicolonPreserving(selectorStack[i][n], '}');
                                let before = selectorStack[i][n].substring(0, sel.length - 1);
                                let after = selectorStack[i][n].substring(sel.length, selectorStack[i][n].length);
                                selectorStack[i][n] = before + after;
                            }

                            unquoted = removeQuotedData(selectorStack[i][n]);
                        } while (unquoted.includes('}'));
                    }
                } else {
                    let unquoted = removeQuotedData(selectorStack[i]);

                    do {
                        if (unquoted.includes('}')) {
                            let sel = seekToFirstUnquotedSemicolonPreserving(selectorStack[i], '}');
                            let before = selectorStack[i].substring(0, sel.length - 1);
                            let after = selectorStack[i].substring(sel.length, selectorStack[i].length);
                            selectorStack[i] = before + after;
                        }

                        unquoted = removeQuotedData(selectorStack[i]);
                    } while (unquoted.includes('}'));
                }
            }

            for (let i = 0; i < selectorStack.length; ++i) {
                if (selectorStack[i] === undefined) {
                    continue;
                } else if (Array.isArray(selectorStack[i])) {
                    for (let n = 0; n < selectorStack[i].length; ++n) {
                        let unquoted = removeQuotedData(selectorStack[i][n]);

                        do {
                            if (unquoted.includes('&')) {
                                let sel = seekToFirstUnquotedSemicolonPreserving(selectorStack[i][n], '&');
                                let before = selectorStack[i][n].substring(0, sel.length - 1);
                                let after = selectorStack[i][n].substring(sel.length, selectorStack[i][n].length);

                                const afterMatch = after[0].match(whitespaceStartPattern);

                                if (after.length > 0 && (!afterMatch || afterMatch.length === 0) && i > 1) {
                                    const value = selectorStack[i - 1][n];
                                    if (value[value.length - 1] !== '&') {
                                        selectorStack[i - 1][n] = value + '&';
                                    }
                                }

                                selectorStack[i][n] = before + after;
                            }

                            unquoted = removeQuotedData(selectorStack[i][n]);
                        } while (unquoted.includes('&'));
                    }
                } else {
                    let unquoted = removeQuotedData(selectorStack[i]);

                    do {
                        if (unquoted.includes('&')) {
                            let sel = seekToFirstUnquotedSemicolonPreserving(selectorStack[i], '&');
                            let before = selectorStack[i].substring(0, sel.length - 1);
                            let after = selectorStack[i].substring(sel.length, selectorStack[i].length);
                            selectorStack[i] = before + after;
                        }

                        unquoted = removeQuotedData(selectorStack[i]);
                    } while (unquoted.includes('&'));
                }
            }

            for (let i = 0; i < selectorStack.length; ++i) {
                if (selectorStack[i] === undefined) {
                    continue;
                } else if (Array.isArray(selectorStack[i])) {
                    for (let n = 0; n < selectorStack[i].length; ++n) {
                        let unquoted = removeQuotedData(selectorStack[i][n]);

                        do {
                            if (unquoted.includes('@nest')) {
                                let sel = seekToFirstUnquotedWord(selectorStack[i][n], '@nest');
                                let before = selectorStack[i][n].substring(0, sel.length - 5);
                                let after = selectorStack[i][n].substring(sel.length + 4, selectorStack[i][n].length);
                                selectorStack[i][n] = before + after;
                            }

                            unquoted = removeQuotedData(selectorStack[i][n]);
                        } while (unquoted.includes('@nest'));
                    }
                } else {
                    let unquoted = removeQuotedData(selectorStack[i]);

                    do {
                        if (unquoted.includes('@nest')) {
                            let sel = seekToFirstUnquotedWord(selectorStack[i], '@nest');
                            let before = selectorStack[i].substring(0, sel.length - 5);
                            let after = selectorStack[i].substring(sel.length + 4, selectorStack[i].length);
                            selectorStack[i] = before + after;
                        }

                        unquoted = removeQuotedData(selectorStack[i]);
                    } while (unquoted.includes('@nest'));
                }
            }

            for (let i = 0; i < selectorStack.length; ++i) {
                if (selectorStack[i] === undefined) {
                    continue;
                } else if (Array.isArray(selectorStack[i])) {
                    for (let n = 0; n < selectorStack[i].length; ++n) {
                        selectorStack[i][n] = selectorStack[i][n].trim();
                    }
                } else {
                    selectorStack[i] = selectorStack[i].trim();
                }
            }

            const multiSelectorMap = new Map();
            for (let i = 0; i < selectorStack.length; ++i) {
                if (selectorStack[i] === undefined) {
                    continue;
                } else {
                    multiSelectorMap.set(i, []);
                }
            }

            if (rules[0] !== undefined && selectorStack[0] === undefined) {
                finalCss += rules[0] + ' ';
            }

            for (let i = 0; i < selectorStack.length; ++i) {
                if (selectorStack[i] === undefined) {
                    continue;
                } else if (Array.isArray(selectorStack[i])) {
                    for (let n = 0; n < selectorStack[i].length; ++n) {
                        let idx = n;

                        for (let t = 0; t <= i; t++) {
                            if (selectorStack[t] === undefined) {
                                continue;
                            } else if (Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                let unquotedSelector = removeQuotedData(selectorStack[t][idx]);
                                let isSuffixMode = false;

                                while (unquotedSelector.includes(',')) {
                                    let sel = seekToFirstUnquotedSemicolonPreserving(selectorStack[t][idx], ',');
                                    let before = selectorStack[t][idx].substring(0, sel.length - 1);
                                    let after = selectorStack[t][idx].substring(sel.length, selectorStack[t][idx].length);

                                    if ((unquotedSelector.endsWith('&') && selectorStack.length > t + 1) || isSuffixMode) {
                                        isSuffixMode = true;
                                        let tokenAfter = selectorStack[t + 1][idx];
                                        const beforeWhitespace = tokenAfter.match(whitespacePattern);

                                        after = after.trim();

                                        if (beforeWhitespace && beforeWhitespace.length > 0) {
                                            let suffix = beforeWhitespace[0].trim();
                                            if (suffix.endsWith(',')) {
                                                suffix = suffix.substring(0, suffix.length - 1);
                                            }

                                            tokenAfter = tokenAfter.substring(suffix.length, tokenAfter.length).trim();

                                            before += suffix;
                                            after = after.substring(0, after.length - 1).trim() + suffix;

                                            if (!tokenAfter.endsWith('&') && suffix.length !== 0) {
                                                selectorStack[t + 1][idx] = tokenAfter;

                                                for (let fix = t - 1; fix >= 0; --fix) {
                                                    if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                        selectorStack[fix][idx] = '';
                                                    }
                                                }
                                            } else if (suffix.length === 0) {
                                                selectorStack[t + 1][idx] = before + tokenAfter;
                                                before = '';

                                                for (let fix = t - 1; fix >= 0; --fix) {
                                                    if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                        selectorStack[fix][idx] = '';
                                                    }
                                                }
                                            } else {
                                                selectorStack[t + 1][idx] = before + ' ' + tokenAfter;

                                                for (let fix = t - 1; fix >= 0; --fix) {
                                                    if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                        selectorStack[fix][idx] = '';
                                                    }
                                                }
                                            }
                                        } else {
                                            before += tokenAfter;
                                            after += tokenAfter;
                                            selectorStack[t + 1][idx] = '';

                                            for (let fix = t - 1; fix >= 0; --fix) {
                                                if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                    selectorStack[fix][idx] = '';
                                                }
                                            }
                                        }
                                    }

                                    let beforeAtRule = before.trim();
                                    if (beforeAtRule.startsWith('@')) {
                                        beforeAtRule = beforeAtRule.substring(0, beforeAtRule.indexOf(' '));
                                    } else {
                                        beforeAtRule = '';
                                    }

                                    selectorStack[t][idx] = beforeAtRule + ' ' + after;
                                    selectorStack[t].splice(idx, 0, before);
                                    rules[t].splice(idx, 0, rules[t][idx]);
                                    for (let add = 0; add < selectorStack.length; ++add) {
                                        if (add === i) continue; if (selectorStack[add] === undefined) continue;
                                        if (Array.isArray(selectorStack[add]) && selectorStack[add].length > idx) {
                                            selectorStack[add].splice(idx, 0, selectorStack[add][idx]);
                                        } else if (Array.isArray(selectorStack[add]) && selectorStack[add].length === idx) {
                                            //      selectorStack[add].push(selectorStack[add][idx- 1]);
                                        } else if (idx === 0) {
                                            selectorStack[add] = [selectorStack[add], selectorStack[add]];
                                        }
                                    }
                                    for (let add = 0; add < rules.length; ++add) {
                                        if (add === i) continue; if (rules[add] === undefined) continue;
                                        if (Array.isArray(rules[add]) && rules[add].length > idx) {
                                            rules[add].splice(idx, 0, rules[add][idx]);
                                        } else if (Array.isArray(rules[add]) && rules[add].length === idx) {
                                            //      selectorStack[add].push(selectorStack[add][idx- 1]);
                                        } else if (idx === 0) {
                                            rules[add] = [rules[add], rules[add]];
                                        }
                                    }
                                    unquotedSelector = removeQuotedData(selectorStack[t][idx]);
                                }
                            } else if (!Array.isArray(selectorStack[t])) {
                                let unquotedSelector = removeQuotedData(selectorStack[t]);
                                let isSuffixMode = false;

                                while (unquotedSelector.includes(',')) {
                                    let sel = seekToFirstUnquotedSemicolonPreserving(selectorStack[t], ',');
                                    let before = selectorStack[t].substring(0, sel.length - 1);
                                    let after = selectorStack[t].substring(sel.length, selectorStack[t].length);

                                    if ((unquotedSelector.endsWith('&') && selectorStack.length > t + 1) || isSuffixMode) {
                                        isSuffixMode = true;
                                        let tokenAfter = selectorStack[t + 1][idx];
                                        const beforeWhitespace = tokenAfter.match(whitespacePattern);

                                        after = after.trim();

                                        if (beforeWhitespace && beforeWhitespace.length > 0) {
                                            let suffix = beforeWhitespace[0].trim();
                                            if (suffix.endsWith(',')) {
                                                suffix = suffix.substring(0, suffix.length - 1);
                                            }

                                            tokenAfter = tokenAfter.substring(suffix.length, tokenAfter.length).trim();

                                            before += suffix;
                                            after = after.substring(0, after.length - 1).trim() + suffix;

                                            if (!tokenAfter.endsWith('&') && suffix.length !== 0) {
                                                selectorStack[t + 1][idx] = tokenAfter;

                                                for (let fix = t - 1; fix >= 0; --fix) {
                                                    if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                        selectorStack[fix][idx] = '';
                                                    }
                                                }
                                            } else if (suffix.length === 0) {
                                                selectorStack[t + 1][idx] = before + tokenAfter;
                                                before = '';

                                                for (let fix = t - 1; fix >= 0; --fix) {
                                                    if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                        selectorStack[fix][idx] = '';
                                                    }
                                                }
                                            } else {
                                                selectorStack[t + 1][idx] = before + ' ' + tokenAfter;

                                                for (let fix = t - 1; fix >= 0; --fix) {
                                                    if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                        selectorStack[fix][idx] = '';
                                                    }
                                                }
                                            }
                                        } else {
                                            before += tokenAfter;
                                            after += tokenAfter;
                                            selectorStack[t + 1][idx] = '';

                                            for (let fix = t - 1; fix >= 0; --fix) {
                                                if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                    selectorStack[fix][idx] = '';
                                                }
                                            }
                                        }
                                    }

                                    selectorStack[t] = after;
                                    selectorStack[t] = [selectorStack[t], before];
                                    unquotedSelector = removeQuotedData(selectorStack[t][idx]);
                                    for (let add = i + 1; add < selectorStack.length; ++add) {
                                        if (Array.isArray(selectorStack[add]) && selectorStack[add].length > idx) {
                                            selectorStack[add].splice(idx, 0, selectorStack[add][idx]);
                                        } else if (idx === 0) {
                                            selectorStack[add] = [selectorStack[add], selectorStack[add]];
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    const rule = rules[i];
                    let idx = 0;

                    for (let n = 0; n <= i; n++) {
                        if (selectorStack[n] === undefined) {
                            continue;
                        } else if (Array.isArray(selectorStack[n])) {
                            let unquotedSelector = removeQuotedData(selectorStack[n][idx]);
                            let isSuffixMode = false;

                            while (unquotedSelector.includes(',')) {
                                let sel = seekToFirstUnquotedSemicolonPreserving(selectorStack[n][idx], ',');
                                let before = selectorStack[n][idx].substring(0, sel.length - 1);
                                let after = selectorStack[n][idx].substring(sel.length, selectorStack[n][idx].length);

                                if ((unquotedSelector.endsWith('&') && selectorStack.length > t + 1) || isSuffixMode) {
                                    isSuffixMode = true;
                                    let tokenAfter = selectorStack[t + 1][idx];
                                    const beforeWhitespace = tokenAfter.match(whitespacePattern);

                                    after = after.trim();

                                    if (beforeWhitespace && beforeWhitespace.length > 0) {
                                        let suffix = beforeWhitespace[0].trim();
                                        if (suffix.endsWith(',')) {
                                            suffix = suffix.substring(0, suffix.length - 1);
                                        }

                                        tokenAfter = tokenAfter.substring(suffix.length, tokenAfter.length).trim();

                                        before += suffix;
                                        after = after.substring(0, after.length - 1).trim() + suffix;

                                        if (!tokenAfter.endsWith('&') && suffix.length !== 0) {
                                            selectorStack[t + 1][idx] = tokenAfter;

                                            for (let fix = t - 1; fix >= 0; --fix) {
                                                if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                    selectorStack[fix][idx] = '';
                                                }
                                            }
                                        } else if (suffix.length === 0) {
                                            selectorStack[t + 1][idx] = before + tokenAfter;
                                            before = '';

                                            for (let fix = t - 1; fix >= 0; --fix) {
                                                if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                    selectorStack[fix][idx] = '';
                                                }
                                            }
                                        } else {
                                            selectorStack[t + 1][idx] = before + ' ' + tokenAfter;

                                            for (let fix = t - 1; fix >= 0; --fix) {
                                                if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                    selectorStack[fix][idx] = '';
                                                }
                                            }
                                        }
                                    } else {
                                        before += tokenAfter;
                                        after += tokenAfter;
                                        selectorStack[t + 1][idx] = '';

                                        for (let fix = t - 1; fix >= 0; --fix) {
                                            if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                selectorStack[fix][idx] = '';
                                            }
                                        }
                                    }
                                }

                                selectorStack[n][idx] = after;
                                selectorStack[n].splice(idx, 0, before);
                                unquotedSelector = removeQuotedData(selectorStack[n][idx]);
                                for (let add = i + 1; add < selectorStack.length; ++add) {
                                    if (Array.isArray(selectorStack[add]) && selectorStack[add].length > idx) {
                                        selectorStack[add].splice(idx, 0, selectorStack[add][idx]);
                                    } else if (idx === 0) {
                                        selectorStack[add] = [selectorStack[add], selectorStack[add]];
                                    }
                                }
                            }
                        } else {
                            let unquotedSelector = removeQuotedData(selectorStack[n]);
                            let isSuffixMode = false;

                            while (unquotedSelector.includes(',')) {
                                let sel = seekToFirstUnquotedSemicolonPreserving(selectorStack[n], ',');
                                let before = selectorStack[n].substring(0, sel.length - 1);
                                let after = selectorStack[n].substring(sel.length, selectorStack[n].length);

                                if ((unquotedSelector.endsWith('&') && selectorStack.length > t + 1) || isSuffixMode) {
                                    isSuffixMode = true;
                                    let tokenAfter = selectorStack[t + 1][idx];
                                    const beforeWhitespace = tokenAfter.match(whitespacePattern);

                                    after = after.trim();

                                    if (beforeWhitespace && beforeWhitespace.length > 0) {
                                        let suffix = beforeWhitespace[0].trim();
                                        if (suffix.endsWith(',')) {
                                            suffix = suffix.substring(0, suffix.length - 1);
                                        }

                                        tokenAfter = tokenAfter.substring(suffix.length, tokenAfter.length).trim();

                                        before += suffix;
                                        after = after.substring(0, after.length - 1).trim() + suffix;

                                        if (!tokenAfter.endsWith('&') && suffix.length !== 0) {
                                            selectorStack[t + 1][idx] = tokenAfter;

                                            for (let fix = t - 1; fix >= 0; --fix) {
                                                if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                    selectorStack[fix][idx] = '';
                                                }
                                            }
                                        } else if (suffix.length === 0) {
                                            selectorStack[t + 1][idx] = before + tokenAfter;
                                            before = '';

                                            for (let fix = t - 1; fix >= 0; --fix) {
                                                if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                    selectorStack[fix][idx] = '';
                                                }
                                            }
                                        } else {
                                            selectorStack[t + 1][idx] = before + ' ' + tokenAfter;

                                            for (let fix = t - 1; fix >= 0; --fix) {
                                                if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                    selectorStack[fix][idx] = '';
                                                }
                                            }
                                        }
                                    } else {
                                        before += tokenAfter;
                                        after += tokenAfter;
                                        selectorStack[t + 1][idx] = '';

                                        for (let fix = t - 1; fix >= 0; --fix) {
                                            if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                selectorStack[fix][idx] = '';
                                            }
                                        }
                                    }
                                }

                                selectorStack[n] = after;
                                selectorStack[n] = [selectorStack[n], before];
                                unquotedSelector = removeQuotedData(selectorStack[n][idx]);
                                for (let add = i + 1; add < selectorStack.length; ++add) {
                                    if (Array.isArray(selectorStack[add]) && selectorStack[add].length > idx) {
                                        selectorStack[add].splice(idx, 0, selectorStack[add][idx]);
                                    } else if (idx === 0) {
                                        selectorStack[add] = [selectorStack[add], selectorStack[add]];
                                    }
                                }
                            }
                        }
                    }
                }
            }

            for (let i = 0; i < selectorStack.length; ++i) {
                if (selectorStack[i] === undefined) {
                    continue;
                } else if (Array.isArray(selectorStack[i])) {
                    for (let n = 0; n < selectorStack[i].length; ++n) {
                        let idx = n;

                        for (let t = 0; t <= i; t++) {
                            if (selectorStack[t] === undefined) {
                                continue;
                            } else if (Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                let unquotedSelector = removeQuotedData(selectorStack[t][idx]);
                                let isSuffixMode = false;

                                let before = selectorStack[t][idx].trim();

                                if ((unquotedSelector.endsWith('&') && selectorStack.length > t + 1) || isSuffixMode) {
                                    isSuffixMode = true;
                                    let tokenAfter = selectorStack[t + 1][idx];
                                    const beforeWhitespace = tokenAfter.match(whitespacePattern);

                                    if (beforeWhitespace && beforeWhitespace.length > 0) {
                                        let suffix = beforeWhitespace[0].trim();
                                        if (suffix.endsWith(',')) {
                                            suffix = suffix.substring(0, suffix.length - 1);
                                        }

                                        tokenAfter = tokenAfter.substring(suffix.length, tokenAfter.length).trim();

                                        before = before.trim().substring(0, before.length - 1).trim() + suffix;

                                        if (!tokenAfter.endsWith('&') && suffix.length !== 0) {
                                            selectorStack[t + 1][idx] = tokenAfter;

                                            for (let fix = t - 1; fix >= 0; --fix) {
                                                if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                    selectorStack[fix][idx] = '';
                                                }
                                            }
                                        } else if (suffix.length === 0) {
                                            selectorStack[t + 1][idx] = before + tokenAfter;
                                            before = '';

                                            for (let fix = t - 1; fix >= 0; --fix) {
                                                if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                    selectorStack[fix][idx] = '';
                                                }
                                            }
                                        } else {
                                            selectorStack[t + 1][idx] = before + ' ' + tokenAfter;

                                            for (let fix = t - 1; fix >= 0; --fix) {
                                                if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                    selectorStack[fix][idx] = '';
                                                }
                                            }
                                        }
                                    } else {
                                        before = before.trim().substring(0, before.length - 1).trim() + tokenAfter;
                                        selectorStack[t + 1][idx] = '';

                                        for (let fix = t - 1; fix >= 0; --fix) {
                                            if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                selectorStack[fix][idx] = '';
                                            }
                                        }
                                    }
                                }

                                selectorStack[t][idx] = before;
                            } else if (!Array.isArray(selectorStack[t])) {
                                let unquotedSelector = removeQuotedData(selectorStack[t]);
                                let isSuffixMode = false;

                                let before = selectorStack[t][idx].trim();

                                if ((unquotedSelector.endsWith('&') && selectorStack.length > t + 1) || isSuffixMode) {
                                    isSuffixMode = true;
                                    let tokenAfter = selectorStack[t + 1][idx];
                                    const beforeWhitespace = tokenAfter.match(whitespacePattern);

                                    if (beforeWhitespace && beforeWhitespace.length > 0) {
                                        let suffix = beforeWhitespace[0].trim();
                                        if (suffix.endsWith(',')) {
                                            suffix = suffix.substring(0, suffix.length - 1);
                                        }

                                        tokenAfter = tokenAfter.substring(suffix.length, tokenAfter.length).trim();

                                        before = before.trim().substring(0, before.length - 1).trim() + suffix;

                                        if (!tokenAfter.endsWith('&') && suffix.length !== 0) {
                                            selectorStack[t + 1][idx] = tokenAfter;

                                            for (let fix = t - 1; fix >= 0; --fix) {
                                                if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                    selectorStack[fix][idx] = '';
                                                }
                                            }
                                        } else if (suffix.length === 0) {
                                            selectorStack[t + 1][idx] = before + tokenAfter;
                                            before = '';

                                            for (let fix = t - 1; fix >= 0; --fix) {
                                                if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                    selectorStack[fix][idx] = '';
                                                }
                                            }
                                        } else {
                                            selectorStack[t + 1][idx] = before + ' ' + tokenAfter;

                                            for (let fix = t - 1; fix >= 0; --fix) {
                                                if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                    selectorStack[fix][idx] = '';
                                                }
                                            }
                                        }
                                    } else {
                                        before = before.trim().substring(0, before.length - 1).trim() + tokenAfter;
                                        selectorStack[t + 1][idx] = '';

                                        for (let fix = t - 1; fix >= 0; --fix) {
                                            if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                selectorStack[fix][idx] = '';
                                            }
                                        }
                                    }
                                }

                                selectorStack[t] = before;
                            }
                        }
                    }
                } else {
                    const rule = rules[i];
                    let idx = 0;

                    for (let n = 0; n <= i; n++) {
                        if (selectorStack[n] === undefined) {
                            continue;
                        } else if (Array.isArray(selectorStack[n])) {
                            let unquotedSelector = removeQuotedData(selectorStack[n][idx]);
                            let isSuffixMode = false;

                            let before = selectorStack[t][idx].trim();

                            if ((unquotedSelector.endsWith('&') && selectorStack.length > t + 1) || isSuffixMode) {
                                isSuffixMode = true;
                                let tokenAfter = selectorStack[t + 1][idx];
                                const beforeWhitespace = tokenAfter.match(whitespacePattern);

                                if (beforeWhitespace && beforeWhitespace.length > 0) {
                                    let suffix = beforeWhitespace[0].trim();
                                    if (suffix.endsWith(',')) {
                                        suffix = suffix.substring(0, suffix.length - 1);
                                    }

                                    tokenAfter = tokenAfter.substring(suffix.length, tokenAfter.length).trim();

                                    before = before.trim().substring(0, before.length - 1).trim() + suffix;

                                    if (!tokenAfter.endsWith('&') && suffix.length !== 0) {
                                        selectorStack[t + 1][idx] = tokenAfter;

                                        for (let fix = t - 1; fix >= 0; --fix) {
                                            if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                selectorStack[fix][idx] = '';
                                            }
                                        }
                                    } else if (suffix.length === 0) {
                                        selectorStack[t + 1][idx] = before + tokenAfter;
                                        before = '';

                                        for (let fix = t - 1; fix >= 0; --fix) {
                                            if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                selectorStack[fix][idx] = '';
                                            }
                                        }
                                    } else {
                                        selectorStack[t + 1][idx] = before + ' ' + tokenAfter;

                                        for (let fix = t - 1; fix >= 0; --fix) {
                                            if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                selectorStack[fix][idx] = '';
                                            }
                                        }
                                    }
                                } else {
                                    before = before.trim().substring(0, before.length - 1).trim() + tokenAfter;
                                    selectorStack[t + 1][idx] = '';

                                    for (let fix = t - 1; fix >= 0; --fix) {
                                        if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                            selectorStack[fix][idx] = '';
                                        }
                                    }
                                }
                            }

                            selectorStack[n][idx] = before;
                        } else {
                            let unquotedSelector = removeQuotedData(selectorStack[n]);
                            let isSuffixMode = false;

                            let before = selectorStack[t][idx].trim();

                            if ((unquotedSelector.endsWith('&') && selectorStack.length > t + 1) || isSuffixMode) {
                                isSuffixMode = true;
                                let tokenAfter = selectorStack[t + 1][idx];
                                const beforeWhitespace = tokenAfter.match(whitespacePattern);

                                if (beforeWhitespace && beforeWhitespace.length > 0) {
                                    let suffix = beforeWhitespace[0].trim();
                                    if (suffix.endsWith(',')) {
                                        suffix = suffix.substring(0, suffix.length - 1);
                                    }

                                    tokenAfter = tokenAfter.substring(suffix.length, tokenAfter.length).trim();

                                    before = before.trim().substring(0, before.length - 1).trim() + suffix;

                                    if (!tokenAfter.endsWith('&') && suffix.length !== 0) {
                                        selectorStack[t + 1][idx] = tokenAfter;

                                        for (let fix = t - 1; fix >= 0; --fix) {
                                            if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                selectorStack[fix][idx] = '';
                                            }
                                        }
                                    } else if (suffix.length === 0) {
                                        selectorStack[t + 1][idx] = before + tokenAfter;
                                        before = '';

                                        for (let fix = t - 1; fix >= 0; --fix) {
                                            if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                selectorStack[fix][idx] = '';
                                            }
                                        }
                                    } else {
                                        selectorStack[t + 1][idx] = before + ' ' + tokenAfter;

                                        for (let fix = t - 1; fix >= 0; --fix) {
                                            if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                                selectorStack[fix][idx] = '';
                                            }
                                        }
                                    }
                                } else {
                                    before = before.trim().substring(0, before.length - 1).trim() + tokenAfter;
                                    selectorStack[t + 1][idx] = '';

                                    for (let fix = t - 1; fix >= 0; --fix) {
                                        if (selectorStack[fix] !== undefined && Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                            selectorStack[fix][idx] = '';
                                        }
                                    }
                                }
                            }

                            selectorStack[n] = before;
                        }
                    }
                }
            }

            cachedSelector = '';

            for (let i = 0; i < selectorStack.length; ++i) {
                if (selectorStack[i] === undefined) {
                    continue;
                } else if (Array.isArray(selectorStack[i])) {
                    for (let n = selectorStack[i].length - 1; n >= 0; --n) {
                        const rule = rules[i][n];
                        let selector = '';
                        let idx = n;
                        let preceding = -1;

                        for (let t = 0; t <= i; t++) {
                            if (selector.startsWith('@')) {
                                if (selector.startsWith('@media') || selector.startsWith('@layer')) {
                                    selector += ' { ';
                                }
                            }

                            cachedSelector = selector;

                            if (selectorStack[t] === undefined) {
                                continue;
                            } else if (Array.isArray(selectorStack[t]) && selectorStack[t].length > idx) {
                                let unquotedSelector = removeQuotedData(selectorStack[t][idx]);
                                const multiIndex = multiSelectorMap.get(i).length;
                                while (unquotedSelector.includes(',')) {
                                    let sel = seekToFirstUnquotedSemicolonPreserving(selectorStack[t][idx], ',');
                                    let before = selectorStack[t][idx].substring(0, sel.length - 1);
                                    let after = selectorStack[t][idx].substring(sel.length, selectorStack[t][idx].length);
                                    selectorStack[t][idx] = after;
                                    selectorStack[t].splice(idx, 0, before);
                                    for (let add = i + 1; add < selectorStack.length; ++add) {
                                        if (Array.isArray(selectorStack[add]) && selectorStack[add].length > idx) {
                                            selectorStack[add].splice(idx, 0, selectorStack[add][idx]);
                                        } else if (idx === 0) {
                                            selectorStack[add] = [selectorStack[add], selectorStack[add]];
                                        }
                                    }
                                    unquotedSelector = removeQuotedData(selectorStack[t][idx]);
                                }

                                if (selectorStack[t][idx].trim().startsWith(':')) {
                                    if (selectorStack[t][idx] !== '') {
                                        selector = selector.trim() + selectorStack[t][idx].trim() + ' ';
                                        lastSelector = selectorStack[t][idx].trim();
                                        for (let ts = 0; ts < multiIndex; ++ts) {
                                            multiSelectorMap.get(i)[ts].value = multiSelectorMap.get(i)[ts].value.trim() + selectorStack[t][idx].trim() + ' ';
                                        }
                                        for (const [key, value] of multiSelectorMap) {
                                            if (key < i) {
                                                value.forEach(match => {
                                                    if (t > match.idx) {
                                                        match.value = match.value.trim() + selectorStack[t][idx].trim() + ' ';
                                                        if (i - 1 > preceding) {
                                                            preceding = i - 1;
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    }
                                } else {
                                    if (selectorStack[t][idx] !== '') {
                                        selector += selectorStack[t][idx] + ' ';
                                        lastSelector = selectorStack[t][idx];
                                        for (let ts = 0; ts < multiIndex; ++ts) {
                                            multiSelectorMap.get(i)[ts].value += selectorStack[t][idx] + ' ';
                                        }
                                        for (const [key, value] of multiSelectorMap) {
                                            if (key < i) {
                                                value.forEach(match => {
                                                    if (t > match.idx) {
                                                        match.value += selectorStack[t][idx].trim() + ' ';
                                                        if (i - 1 > preceding) {
                                                            preceding = i - 1;
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    }
                                }
                            } else if (!Array.isArray(selectorStack[t])) {
                                let unquotedSelector = removeQuotedData(selectorStack[t]);
                                const multiIndex = multiSelectorMap.get(i).length;
                                while (unquotedSelector.includes(',')) {
                                    let sel = seekToFirstUnquotedSemicolonPreserving(selectorStack[t], ',');
                                    let before = selectorStack[t].substring(0, sel.length - 1);
                                    let after = selectorStack[t].substring(sel.length, selectorStack[t].length);
                                    selectorStack[t] = after;
                                    selectorStack[t] = [selectorStack[t], before];
                                    unquotedSelector = removeQuotedData(selectorStack[t][idx]);
                                    for (let add = i + 1; add < selectorStack.length; ++add) {
                                        if (Array.isArray(selectorStack[add]) && selectorStack[add].length > idx) {
                                            selectorStack[add].splice(idx, 0, selectorStack[add][idx]);
                                        } else if (idx === 0) {
                                            selectorStack[add] = [selectorStack[add], selectorStack[add]];
                                        }
                                    }
                                }

                                if (selectorStack[t].trim().startsWith(':')) {
                                    if (selectorStack[t] !== '') {
                                        selector = selector.trim() + selectorStack[t].trim() + ' ';
                                        lastSelector = selectorStack[t].trim();
                                        for (let ts = 0; ts < multiIndex; ++ts) {
                                            multiSelectorMap.get(i)[ts].value = multiSelectorMap.get(i)[ts].value.trim() + selectorStack[t].trim() + ' ';
                                        }
                                        for (const [key, value] of multiSelectorMap) {
                                            if (key < i) {
                                                value.forEach(match => {
                                                    if (t > match.idx) {
                                                        match.value = match.value.trim() + selectorStack[t].trim() + ' ';
                                                        if (i - 1 > preceding) {
                                                            preceding = i - 1;
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    }
                                } else {
                                    if (selectorStack[t] !== '') {
                                        selector += selectorStack[t] + ' ';
                                        lastSelector = selectorStack[t];
                                        for (let ts = 0; ts < multiIndex; ++ts) {
                                            multiSelectorMap.get(i)[ts].value += selectorStack[t] + ' ';
                                        }
                                        for (const [key, value] of multiSelectorMap) {
                                            if (key < i) {
                                                value.forEach(match => {
                                                    if (t > match.idx) {
                                                        match.value = match.value += selectorStack[t] + ' ';
                                                        if (i - 1 > preceding) {
                                                            preceding = i - 1;
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (selector.replace(cachedSelector, '').startsWith('@') && selector.replace(cachedSelector, '').startsWith('@media')) {
                            selector = cachedSelector + ' { ' + selector.replace(cachedSelector, '');
                        } else if (!cachedSelector.trim().endsWith('{') && /@layer\s+[a-zA-Z_][a-zA-Z0-9_-]*\s+.*\s+$/.test(selector)) {
                            selector = cachedSelector + ' { ' + selector.replace(cachedSelector, '');
                        }

                        if (selector && rule) {
                            const mq = formatMediaQuery(selector);
                            if (mq === null) {
                                finalCss += selector + '{' + rule + '}\n';
                            } else {
                                if (mq[1].trim() !== '') {
                                    finalCss += mq[0] + '{' + mq[1] + '{' + rule + '} }\n';
                                } else {
                                    finalCss += mq[0] + '{' + rule + '}';
                                }
                                for (let bc = 0; bc < mq[2]; ++bc) {
                                    finalCss += '} ';
                                }
                            }
                        }

                        for (let t = 0; t < multiSelectorMap.get(i).length; ++t) {
                            const mq = formatMediaQuery(multiSelectorMap.get(i)[t].value);
                            if (mq === null) {
                                finalCss += multiSelectorMap.get(i)[t].value + '{' + rule + '}\n';
                            } else {
                                if (mq[1].trim() !== '') {
                                    finalCss += mq[0] + '{' + mq[1] + '{' + rule + '} }\n';
                                } else {
                                    finalCss += mq[0] + '{' + rule + '}';
                                }
                                for (let bc = 0; bc < mq[2]; ++bc) {
                                    finalCss += '} ';
                                }
                            }
                        }

                        for (; preceding >= 0; --preceding) {
                            if (multiSelectorMap.get(preceding) !== undefined) {
                                for (let t = 0; t < multiSelectorMap.get(preceding).length; ++t) {
                                    const mq = formatMediaQuery(multiSelectorMap.get(preceding)[t].value);
                                    if (mq === null) {
                                        finalCss += multiSelectorMap.get(preceding)[t].value + '{' + rule + '}\n';
                                    }
                                    else {
                                        if (mq[1].trim() !== '') {
                                            finalCss += mq[0] + '{' + mq[1] + '{' + rule + '} }\n';
                                        } else {
                                            finalCss += mq[0] + '{' + rule + '}';
                                        }
                                        for (let bc = 0; bc < mq[2]; ++bc) {
                                            finalCss += '} ';
                                        }
                                    }

                                    multiSelectorMap.get(preceding)[t].value = multiSelectorMap.get(preceding)[t].origValue;
                                }
                            }
                        }
                    }
                } else {
                    const rule = rules[i];
                    let selector = '';
                    let idx = 0;
                    let preceding = -1;

                    for (let n = 0; n <= i; n++) {
                        if (selectorStack[n] === undefined) {
                            continue;
                        } else if (Array.isArray(selectorStack[n])) {
                            let unquotedSelector = removeQuotedData(selectorStack[n][idx]);
                            const multiIndex = multiSelectorMap.get(i).length;
                            while (unquotedSelector.includes(',')) {
                                let sel = seekToFirstUnquotedSemicolonPreserving(selectorStack[n][idx], ',');
                                let before = selectorStack[n][idx].substring(0, sel.length - 1);
                                let after = selectorStack[n][idx].substring(sel.length, selectorStack[n][idx].length);
                                selectorStack[n][idx] = after;
                                selectorStack[n].splice(idx, 0, before);
                                unquotedSelector = removeQuotedData(selectorStack[n][idx]);
                                for (let add = i + 1; add < selectorStack.length; ++add) {
                                    if (Array.isArray(selectorStack[add]) && selectorStack[add].length > idx) {
                                        selectorStack[add].splice(idx, 0, selectorStack[add][idx]);
                                    } else if (idx === 0) {
                                        selectorStack[add] = [selectorStack[add], selectorStack[add]];
                                    }
                                }
                            }

                            if (selectorStack[n][idx].trim().startsWith(':')) {
                                if (selectorStack[n][idx] !== '') {
                                    selector = selector.trim() + selectorStack[n][idx].trim() + ' ';
                                    lastSelector = selectorStack[n][idx].trim();
                                    for (let t = 0; t < multiIndex; ++t) {
                                        multiSelectorMap.get(i)[t].value = multiSelectorMap.get(i)[t].value.trim() + selectorStack[n][idx].trim() + ' ';
                                    }
                                    for (const [key, value] of multiSelectorMap) {
                                        if (key < i) {
                                            value.forEach(match => {
                                                if (n > match.idx) {
                                                    match.value = match.value.trim() + selectorStack[n][idx].trim() + ' ';
                                                    if (i - 1 > preceding) {
                                                        preceding = i - 1;
                                                    }
                                                }
                                            })
                                        }
                                    }
                                }
                            } else {
                                if (selectorStack[n][idx] !== '') {
                                    selector += selectorStack[n][idx] + ' ';
                                    lastSelector = selectorStack[n][idx];
                                    for (let t = 0; t < multiIndex; ++t) {
                                        multiSelectorMap.get(i)[t].value += selectorStack[n][idx] + ' ';
                                    }
                                    for (const [key, value] of multiSelectorMap) {
                                        if (key < i) {
                                            value.forEach(match => {
                                                if (n > match.idx) {
                                                    match.value += selectorStack[n][idx].trim() + ' ';
                                                    if (i - 1 > preceding) {
                                                        preceding = i - 1;
                                                    }
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                        } else {
                            let unquotedSelector = removeQuotedData(selectorStack[n]);
                            const multiIndex = multiSelectorMap.get(i).length;
                            while (unquotedSelector.includes(',')) {
                                let sel = seekToFirstUnquotedSemicolonPreserving(selectorStack[n], ',');
                                let before = selectorStack[n].substring(0, sel.length - 1);
                                let after = selectorStack[n].substring(sel.length, selectorStack[n].length);
                                selectorStack[n] = after;
                                selectorStack[n] = [selectorStack[n], before];
                                unquotedSelector = removeQuotedData(selectorStack[n][idx]);
                                for (let add = i + 1; add < selectorStack.length; ++add) {
                                    if (Array.isArray(selectorStack[add]) && selectorStack[add].length > idx) {
                                        selectorStack[add].splice(idx, 0, selectorStack[add][idx]);
                                    } else if (idx === 0) {
                                        selectorStack[add] = [selectorStack[add], selectorStack[add]];
                                    }
                                }
                            }

                            if (selectorStack[n].trim().startsWith(':')) {
                                if (selectorStack[n] !== '') {
                                    selector = selector.trim() + selectorStack[n].trim() + ' ';
                                    lastSelector = selectorStack[n].trim();
                                    for (let t = 0; t < multiIndex; ++t) {
                                        multiSelectorMap.get(i)[t].value = multiSelectorMap.get(i)[t].value.trim() + selectorStack[n].trim() + ' ';
                                    }
                                    for (const [key, value] of multiSelectorMap) {
                                        if (key < i) {
                                            value.forEach(match => {
                                                if (n > match.idx) {
                                                    match.value = match.value.trim() + selectorStack[n].trim() + ' ';
                                                    if (i - 1 > preceding) {
                                                        preceding = i - 1;
                                                    }
                                                }
                                            })
                                        }
                                    }
                                }
                            } else {
                                if (selectorStack[n] !== '') {
                                    selector += selectorStack[n] + ' ';
                                    lastSelector = selectorStack[n];
                                    for (let t = 0; t < multiIndex; ++t) {
                                        multiSelectorMap.get(i)[t].value += selectorStack[n] + ' ';
                                    }
                                    for (const [key, value] of multiSelectorMap) {
                                        if (key < i) {
                                            value.forEach(match => {
                                                if (n > match.idx) {
                                                    match.value += selectorStack[n] + ' ';
                                                    if (i - 1 > preceding) {
                                                        preceding = i - 1;
                                                    }
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (selector && rule) {
                        const mq = formatMediaQuery(selector);
                        if (mq === null) {
                            finalCss += selector + '{' + rule + '}\n';
                        } else {
                            if (mq[1].trim() !== '') {
                                finalCss += mq[0] + '{' + mq[1] + '{' + rule + '} }\n';
                            } else {
                                finalCss += mq[0] + '{' + rule + '}';
                            }
                            for (let bc = 0; bc < mq[2]; ++bc) {
                                finalCss += '} ';
                            }
                        }
                    }

                    for (let t = 0; t < multiSelectorMap.get(i).length; ++t) {
                        const mq = formatMediaQuery(multiSelectorMap.get(i)[t].value);
                        if (mq === null) {
                            finalCss += multiSelectorMap.get(i)[t].value + '{' + rule + '}\n';

                            for (let ti = i - 1; ti >= 0; --ti) {
                                if (multiSelectorMap.get(ti) !== undefined) {
                                    const list = [];
                                    for (let m = 0; m < multiSelectorMap.get(ti).length; ++m) {
                                        const newData = {};
                                        newData.origValue = multiSelectorMap.get(ti)[m].origValue + ' ' + lastSelector;
                                        newData.value = multiSelectorMap.get(ti)[m].value + ' ' + lastSelector;
                                        newData.idx = multiSelectorMap.get(ti)[m].idx;
                                        list.push(newData);
                                    }
                                    const newList = multiSelectorMap.get(ti).concat(list);
                                    multiSelectorMap.set(ti, newList);
                                }
                            }
                        } else {
                            if (mq[1].trim() !== '') {
                                finalCss += mq[0] + '{' + mq[1] + '{' + rule + '} }\n';
                            } else {
                                finalCss += mq[0] + '{' + rule + '}';
                            }
                            for (let bc = 0; bc < mq[2]; ++bc) {
                                finalCss += '} ';
                            }
                        }
                    }

                    for (; preceding >= 0; --preceding) {
                        if (multiSelectorMap.get(preceding) !== undefined) {
                            for (let t = 0; t < multiSelectorMap.get(preceding).length; ++t) {
                                const mq = formatMediaQuery(multiSelectorMap.get(preceding)[t].value);
                                if (mq === null) {
                                    finalCss += multiSelectorMap.get(preceding)[t].value + '{' + rule + '}\n';
                                }
                                else {
                                    if (mq[1].trim() !== '') {
                                        finalCss += mq[0] + '{' + mq[1] + '{' + rule + '} }\n';
                                    } else {
                                        finalCss += mq[0] + '{' + rule + '}';
                                    }
                                    for (let bc = 0; bc < mq[2]; ++bc) {
                                        finalCss += '} ';
                                    }
                                }

                                multiSelectorMap.get(preceding)[t].value = multiSelectorMap.get(preceding)[t].origValue;
                            }
                        }
                    }
                }
            }
        } else {
            cssText = cssText.substring(data.length, cssText.length);

            finalCss += data.trim() + '\n';
        }
    }

    return finalCss;
}

const atSet = new Set(['@media', '@layer']);

const formatMediaQuery = (query, appendMode = false) => {
    let unquoted = removeQuotedData(query);
    let mediaQueryFinal = '';
    let braceCount = 0;
    let afterTrimmed;

    for (const atRule of atSet) {
        while (unquoted.includes(atRule)) {
            let sel = seekToFirstUnquotedWord(query, atRule);
            let before = query.substring(0, sel.length - 1);
            let after = query.substring(sel.length - 1, query.length);
            let mq = after.substring(0, after.indexOf(atRule) + atRule.length);

            after = after.substring(mq.length, after.length).trim();

            if (appendMode === true) {
                mq = ' { @media ';
            }

            let mq2 = '';
            let tmp = seekToFirstUnquotedSemicolon(after, ' ');
            if (tmp.length > mq2.length) {
                mq2 = tmp;
            }
            tmp = seekToFirstUnquotedSemicolon(after, '{');
            if (tmp.length > mq2.length) {
                mq2 = tmp;
            }
            if (!after.includes(' ') && mq2.length < after) {
                mq2 = after;
            }

            while (mq2.includes('(') && countSubstr(mq2, '(') !== countSubstr(mq2, ')')) {
                mq2 = after.substring(0, after.indexOf(')', mq2.length) + 1);
            }
            after = after.substring(mq2.length, after.length);
            afterTrimmed = after.trim();
            while (afterTrimmed.startsWith('@media')) {
                let [mediaQueryFinal2, query2, braceCount2] = formatMediaQuery(afterTrimmed, true);

                mq2 = mq2.trim();
                if (mq2.endsWith('{')) {
                    mq2 = mq2.substring(0, mq2.length - 1);
                }

                mediaQueryFinal2 = mediaQueryFinal2.trim();
                if (mediaQueryFinal2.endsWith('{')) {
                    mediaQueryFinal2 = mediaQueryFinal2.substring(0, mediaQueryFinal2.length - 1);
                }

                mq2 += mediaQueryFinal2;
                afterTrimmed = query2.trim();

                const beforeMq2 = seekToFirstUnquotedSemicolonPreserving(after, '{');
                after = after.substring(beforeMq2.length, after.length);
            }
            mq += ' ' + mq2;

            if (mediaQueryFinal === '') {
                mediaQueryFinal += mq;
            } else if (atRule === '@media') {
                mediaQueryFinal += ' ' + mq;
            } else if (atRule === '@layer') {
                mediaQueryFinal = mediaQueryFinal.trim();
                if (!mediaQueryFinal.endsWith('{')) {
                    mediaQueryFinal += ' { ';
                }
                mediaQueryFinal += mq;
            }

            if (braceCount === 0) {
                query = before + ' ' + after;
            } else {
                if (before.trim() !== '') {
                    after = before + ' ' + after;
                }
                query = ' ' + after;
            }
            unquoted = removeQuotedData(query);
        }
    }

    if (mediaQueryFinal !== '') {
        mediaQueryFinal = mediaQueryFinal.trim();
        if (mediaQueryFinal.endsWith('{')) {
            mediaQueryFinal = mediaQueryFinal.substring(0, mediaQueryFinal.length - 1);
        }

        query = query.trim();
        if (query.endsWith('{')) {
            query = query.substring(0, query.length - 1);
        }

        let unquotedQuery = removeQuotedData(query);
        braceCount += countSubstr(unquotedQuery, '{');
        unquotedQuery = removeQuotedData(mediaQueryFinal);
        braceCount += countSubstr(unquotedQuery, '{');

        return [mediaQueryFinal, query, braceCount];
    } else {
        return null;
    }
}

function transformNess(data) {
    const formatted = applyScopedCss(data);
    return formatted;
}

module.exports = { transformNess };
