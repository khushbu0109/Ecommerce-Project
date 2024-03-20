import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function UrduKeyboard(props) {
    /*Unicode Alphabet*/
    var ALLAH = 0xfdf2;
    var ALIF = 0x0627;
    var ALMAD = 0x0622;
    var BAY = 0x0628;
    var PAY = 0x067e;
    var TAY = 0x062a;
    var TTAY = 0x0679;
    var SAY = 0x062b;
    var JEEM = 0x062c;
    var CHAY = 0x0686;
    var HAY = 0x062d;
    var KHAY = 0x062e;
    var DAL = 0x062f;
    var DDAL = 0x0688;
    var ZAL = 0x0630;
    var RAY = 0x0631;
    var RRAY = 0x0691;
    var ZAY = 0x0632;
    var XAY = 0x0698;
    var SEEN = 0x0633;
    var SHEEN = 0x0634;
    var SAAD = 0x0635;
    var ZAAD = 0x0636;
    var TOAY = 0x0637;
    var ZOAY = 0x0638;
    var AIN = 0x0639;
    var GHAIN = 0x063a;
    var FAY = 0x0641;
    var QAAF = 0x0642;
    var KAAF = 0x06a9;
    var GAAF = 0x06af;
    var LAAM = 0x0644;
    var MEEM = 0x0645;
    var NOON = 0x0646;
    var NOONG = 0x06ba;
    var WAO = 0x0648;
    var WAOHAMZ = 0x0624;
    var HAA = 0x06c1;
    var HAMZA = 0x0621;
    var HAMCY = 0x0626; //Hamza on chootee yay
    var CHOTIYA = 0x06cc;
    var BARRIYA = 0x06d2;
    var DCHASHMI = 0x06be;

    /*Unicode Digits*/
    var ZERO = 0x6f0;
    var ONE = 0x6f1;
    var TWO = 0x6f2;
    var THREE = 0x6f3;
    var FOUR = 0x6f4;
    var FIVE = 0x6f5;
    var SIX = 0x6f6;
    var SEVEN = 0x6f7;
    var EIGHT = 0x6f8;
    var NINE = 0x6f9;

    /*Unicode Arabic Mathematical Symbols*/
    var PLUS = 0x002b;
    var MINUS = 0x002d;
    var MUL = 0x00d7;
    var DIV = 0x00f7;
    var PERC = 0x066a;
    var LPREN = 0x0028;
    var RPREN = 0x0029;

    /*Unicode Arabic Aarab Symbols*/
    var PAISH = 0x064f;
    var ZAIR = 0x0650;
    var ZABAR = 0x064e;
    var DOPAISH = 0x064c;
    var DOZAIR = 0x064d;
    var DOZABAR = 0x064b;
    var GAZM = 0x0652;
    var MAD = 0x06e4;
    var SHAD = 0x0651;
    var SHADZAIR = 0xfc62;
    var SHADPAISH = 0xfc61;
    var HIHAMZA = 0x0674;
    var KHARIZAB = 0x0670;

    /*Unicode Arabic Punctuations*/
    var RSQOTMRK = 0x2019;
    var LSQOTMRK = 0x2018;
    var RDQOTMRK = 0x201d;
    var LDQOTMRK = 0x201c;
    var DECSEP = 0x0201a;
    var FULSTOP = 0x06d4;
    var AQMARK = 0x061f;
    var ASEMICOL = 0x061b;
    var ACOMA = 0x060c;
    var NOT = 0x0021;
    var QUOT = 0x0022;
    var COLON = 0x003a;
    var SEMICOL = 0x003b;

    /*Keyboard Keys*/
    var K_ALIF = 97; //'a';
    var K_ALMAD = 65; //'A';
    var K_BAY = 98; //'b';
    var K_PAY = 112; //'p';
    var K_TAY = 116; //'t';
    var K_TTAY = 84; //'T';
    var K_SAY = 67; //'C';
    var K_JEEM = 106; //'j';
    var K_CHAY = 99; //'c';
    var K_HAY = 72; //'H';
    var K_KHAY = 75; //'K';
    var K_DAL = 100; //'d';
    var K_DDAL = 68; //'D';
    var K_ZAL = 90; //'Z';
    var K_RAY = 114; //'r';
    var K_RRAY = 82; //'R';
    var K_ZAY = 122; //'z';
    var K_XAY = 88; //'X';
    var K_SEEN = 115; //'s';
    var K_SHEEN = 120; //'x';
    var K_SAAD = 83; //'S';
    var K_ZAAD = 74; //'J';
    var K_TOAY = 118; //'v';
    var K_ZOAY = 86; //'V';
    var K_AIN = 101; //'e';
    var K_GHAIN = 71; //'G';
    var K_FAY = 102; //'f';
    var K_QAAF = 113; //'q';
    var K_KAAF = 107; //'k';
    var K_GAAF = 103; //'g';
    var K_LAAM = 108; //'l';
    var K_MEEM = 109; //'m';
    var K_NOON = 110; //'n';
    var K_NOONG = 78; //'N';
    var K_WAO = 119; //'w';
    var K_HAA = 111; //'o';
    var K_DCHASHMI = 104; //'h';
    var K_HAMZA = 117; //'u';
    var K_CHOTIYA = 105; //'i';
    var K_BARRIYA = 121; //'y';
    var K_HAMZAYA = 85; //'U';

    /*Keyboard Digits*/
    var K_ZERO = 48; //'0';
    var K_ONE = 49; //'1';
    var K_TWO = 50; //'2';
    var K_THREE = 51; //'3';
    var K_FOUR = 52; //'4';
    var K_FIVE = 53; //'5';
    var K_SIX = 54; //'6';
    var K_SEVEN = 55; //'7';
    var K_EIGHT = 56; //'8';
    var K_NINE = 57; //'9';

    /*Key Board Arithmetic Operators*/
    var K_PLUS = 43; //'+';
    var K_MINUS = 45; //'-';
    var K_MUL = 42; //'*';
    var K_DIV = 47; //'/';
    var K_PERC = 37; //'%';
    var K_LPREN = 41; //')';
    var K_RPREN = 40; //'(';
    var K_EQ = 61; //'=';

    /*Keyboard Punctuation*/
    var K_SQOTMRK = 44; //'\'';
    var K_DQOTMRK = 34; //'"';
    var K_FULSTOP = 46; //'.';
    var K_QMARK = 63; //'?';
    var K_SEMICOL = 59; //';';
    var K_COMA = 44; //',';
    var K_NOT = 33; //'!';
    var K_COLON = 58; //':';

    var SPACE = 32; //' ';
    var ENTER = 13; //'\r';
    var NLINE = "\n";
    var TAB = 9; //'\t';

    /*Ascii Keys*/
    var aK_ALIF = "a";
    var aK_ALMAD = "A";
    var aK_BAY = "b";
    var aK_PAY = "p";
    var aK_TAY = "t";
    var aK_TTAY = "T";
    var aK_SAY = "C";
    var aK_JEEM = "j";
    var aK_CHAY = "c";
    var aK_HAY = "H";
    var aK_KHAY = "K";
    var aK_DAL = "d";
    var aK_DDAL = "D";
    var aK_ZAL = "Z";
    var aK_RAY = "r";
    var aK_RRAY = "R";
    var aK_ZAY = "z";
    var aK_XAY = "X";
    var aK_SEEN = "s";
    var aK_SHEEN = "x";
    var aK_SAAD = "S";
    var aK_ZAAD = "J";
    var aK_TOAY = "v";
    var aK_ZOAY = "V";
    var aK_AIN = "e";
    var aK_GHAIN = "G";
    var aK_FAY = "f";
    var aK_QAAF = "q";
    var aK_KAAF = "k";
    var aK_GAAF = "g";
    var aK_LAAM = "l";
    var aK_MEEM = "m";
    var aK_NOON = "n";
    var aK_NOONG = "N";
    var aK_WAO = "w";
    var aK_HAA = "o";
    var aK_DCHASHMI = "h";
    var aK_HAMZA = "u";
    var aK_CHOTIYA = "i";
    var aK_BARRIYA = "y";
    var aK_HAMZAYA = "U";

    /*Ascii Digits*/
    var aK_ZERO = "0";
    var aK_ONE = "1";
    var aK_TWO = "2";
    var aK_THREE = "3";
    var aK_FOUR = "4";
    var aK_FIVE = "5";
    var aK_SIX = "6";
    var aK_SEVEN = "7";
    var aK_EIGHT = "8";
    var aK_NINE = "9";

    /*Ascii Arithmetic Operators*/
    var aK_PLUS = "+";
    var aK_MINUS = "-";
    var aK_MUL = "*";
    var aK_DIV = "/";
    var aK_PERC = "%";
    var aK_LPREN = ")";
    var aK_RPREN = "(";
    var aK_EQ = "=";

    /*Ascii Punctuation*/
    var aK_SQOTMRK = "'";
    var aK_DQOTMRK = '"';
    var aK_FULSTOP = ".";
    var aK_QMARK = "?";
    var aK_SEMICOL = ";";
    var aK_COMA = ",";
    var aK_NOT = "!";
    var aK_COLON = ":";

    var aSPACE = " ";
    var aENTER = "\r";
    var aNLINE = "\n";
    var aTAB = "\t";

    const [urdu, seturdu] = useState("");
    const textBox = useRef();

    useEffect(() => {
        MaketextBoxUrduEnabled(textBox.current);
        console.log("this is useasdfas = " + textBox.current);
    }, []);

    function MaketextBoxUrduEnabled(txtObj) {
        //set page event handlers
        if (window.attachEvent) {
            //Support is expected to discontinue in IE11
            //IE and Opera
            txtObj.attachEvent("onkeypress", com_ajsoftpk_urdubar_eventCaptured);
        } else {
            //FireFox and Other
            txtObj.addEventListener(
                "keypress",
                com_ajsoftpk_urdubar_eventCaptured,
                false
            );
        }
    }

    function com_ajsoftpk_urdubar_eventCaptured(evt) {
        var target;
        if (evt.target) target = evt.target;
        else target = evt.srcElement; //for IE

        com_ajsoftpk_KeyPress(target, evt);
    }

    function com_ajsoftpk_setUrduPhoneticUnicodes(temp) {
        var var_char = "";

        switch (temp) {
            case aK_ALIF:
                var_char = ALIF;
                break;
            case aK_ALMAD:
                var_char = ALMAD;
                break;
            case aK_BAY:
                var_char = BAY;
                break;

            case aK_PAY:
                var_char = PAY;
                break;

            case aK_TAY:
                var_char = TAY;
                break;
            case aK_TTAY:
                var_char = TTAY;
                break;
            case aK_SAY:
                var_char = SAY;
                break;

            case aK_JEEM:
                var_char = JEEM;
                break;
            case aK_CHAY:
                var_char = CHAY;
                break;
            case aK_HAY:
                var_char = HAY;
                break;

            case aK_KHAY:
                var_char = KHAY;
                break;
            case aK_DAL:
                var_char = DAL;
                break;
            case aK_DDAL:
                var_char = DDAL;
                break;

            case aK_ZAL:
                var_char = ZAL;
                break;
            case aK_RAY:
                var_char = RAY;
                break;
            case aK_RRAY:
                var_char = RRAY;
                break;
            case aK_ZAY:
                var_char = ZAY;
                break;
            case aK_XAY:
                var_char = XAY;
                break;
            case aK_SEEN:
                var_char = SEEN;
                break;
            case aK_SHEEN:
                var_char = SHEEN;
                break;
            case aK_SAAD:
                var_char = SAAD;
                break;
            case aK_ZAAD:
                var_char = ZAAD;
                break;
            case aK_TOAY:
                var_char = TOAY;
                break;
            case aK_ZOAY:
                var_char = ZOAY;
                break;

            case aK_AIN:
                var_char = AIN;
                break;
            case aK_GHAIN:
                var_char = GHAIN;
                break;

            case aK_FAY:
                var_char = FAY;
                break;

            case aK_QAAF:
                var_char = QAAF;
                break;

            case aK_KAAF:
                var_char = KAAF;
                break;

            case aK_GAAF:
                var_char = GAAF;
                break;
            case aK_LAAM:
                var_char = LAAM;
                break;

            case aK_MEEM:
                var_char = MEEM;
                break;
            case aK_NOON:
                var_char = NOON;
                break;
            case aK_NOONG:
                var_char = NOONG;
                break;
            case aK_WAO:
                var_char = WAO;
                break;
            case aK_HAA:
                var_char = HAA;
                break;
            case aK_DCHASHMI:
                var_char = DCHASHMI;
                break;
            case aK_HAMZAYA:
                var_char = HAMCY;
                break;
            case aK_CHOTIYA:
                var_char = CHOTIYA;
                break;
            case aK_BARRIYA:
                var_char = BARRIYA;
                break;
            case aK_HAMZA:
                var_char = HAMZA;
                break;
            case aK_LPREN:
                var_char = LPREN;
                break;
            case aK_RPREN:
                var_char = RPREN;
                break;
            case aK_SQOTMRK:
                var_char = RSQOTMRK;
                break;
            case aK_DQOTMRK:
                var_char = RDQOTMRK;
                break;
            case aK_FULSTOP:
                var_char = FULSTOP;
                break;
            case aK_QMARK:
                var_char = AQMARK;
                break;
            case aK_SEMICOL:
                var_char = ASEMICOL;
                break;
            case aK_COMA:
                var_char = ACOMA;
                break;
            case aK_NOT:
                var_char = NOT;
                break;
            case aK_COLON:
                var_char = COLON;
                break;
            case aSPACE:
                var_char = 32;
                break;
            case aENTER:
                var_char = 13;
                break;

            case aK_ZERO:
                var_char = ZERO;
                break;
            case aK_ONE:
                var_char = ONE;
                break;
            case aK_TWO:
                var_char = TWO;
                break;
            case aK_THREE:
                var_char = THREE;
                break;
            case aK_FOUR:
                var_char = FOUR;
                break;
            case aK_FIVE:
                var_char = FIVE;
                break;
            case aK_SIX:
                var_char = SIX;
                break;
            case aK_SEVEN:
                var_char = SEVEN;
                break;
            case aK_EIGHT:
                var_char = EIGHT;
                break;
            case aK_NINE:
                var_char = NINE;
                break;
            default:
                return false;
                break;
        } //case

        return var_char;
    } //function
    function com_ajsoftpk_getNextStateUrduPhoneticLayout(
        lastInput,
        currentInput
    ) {
        return String.fromCharCode(
            com_ajsoftpk_setUrduPhoneticUnicodes(currentInput)
        );
    }

    function com_ajsoftpk_KeyPress(textBox, evt) {
        var keyCode;
        var keyChar;
        evt = evt ? evt : window.event ? window.event : null;
        if (evt) {
            if (window.event) {
                keyCode = evt.keyCode;
            } else {
                keyCode = evt.charCode;
            }

            if (evt.ctrlKey == true) {
                return true;
            }
            if (evt.altKey == true) {
                return true;
            }
            if (keyCode == 0) {
                return true;
            }
        } else {
            alert("Wrong version");
            return true;
        }
        {
            evt.returnValue = false;
        }
        keyChar = String.fromCharCode(keyCode);
        console.log("keychar = " + keyChar);

        if (com_ajsoftpk_isValidAlphabet(keyChar)) {

            var apnaChar = com_ajsoftpk_getNextStateUrduPhoneticLayout(
                com_ajsoftpk_findLastChar(textBox),
                keyChar
            );
            console.log("valid - " + apnaChar + " - " + keyChar);
            if (apnaChar == keyChar) {
                com_ajsoftpk_replaceEndOfWord(
                    textBox,
                    com_ajsoftpk_findLastChar(textBox)
                );
            }

            com_ajsoftpk_insertAtCaret(textBox, apnaChar);
            if (evt.preventDefault) {
                evt.preventDefault();
                evt.cancelBubble = true;
            }
        }
    }

    function com_ajsoftpk_isValidAlphabet(character) {
        if (com_ajsoftpk_getNextStateUrduPhoneticLayout("", character) == "")
            return false;
        return true;
    }
    //   function com_ajsoftpk_moveCursor() {
    //     var range = textBox.createTextRange();
    //     range.moveStart("character", caret);
    //     range.collapse(), range.select();
    //   }

    function com_ajsoftpk_replaceEndOfWord(textBox, character) {
        var nayaChar;
        nayaChar = String.fromCharCode(character.charCodeAt(0));
        console.log("replace - " + nayaChar);
        if (nayaChar != character) {
            com_ajsoftpk_eraseLastChar(textBox);
            com_ajsoftpk_insertAtCaret(textBox, nayaChar);
        }
    }
    function com_ajsoftpk_findLastChar(textBox) {
        if (textBox.createTextRange) {
            var range;
            if (document.selection) {
                //nsm IE<11 feature check
                range = document.selection.createRange().duplicate(); //works prior to IE11 for IE11 use getSelection instead of selection
            } else {
                range = textBox.createTextRange(); //for IE11
            }

            range.moveStart("character", -1);
            return range.text;
        } else if (textBox.selectionStart) {
            var startPos = textBox.selectionStart;
            var endPos = textBox.selectionEnd;
            startPos = startPos - 1;
            endPos = startPos + 1;
            return textBox.value.substring(startPos, endPos);
        }

        return "";
    }
    function com_ajsoftpk_eraseLastChar(textBox) {
        if (textBox.createTextRange) {
            var range = document.selection.createRange().duplicate();
            range.moveStart("character", -1);
            range.text = "";
        } else {
            var txtarea = textBox;
            var startPos = txtarea.selectionStart - 1;
            var endPos = txtarea.selectionEnd;
            var scrollTop = txtarea.scrollTop;
            txtarea.value =
                txtarea.value.substring(0, startPos) +
                txtarea.value.substring(endPos, txtarea.value.length);
            var cPos = startPos;
            txtarea.selectionStart = cPos;
            txtarea.selectionEnd = cPos;
            txtarea.scrollTop = scrollTop;
        }
    }
    function com_ajsoftpk_insertAtCaret(textBox, text) {
        var txtarea = textBox;

        if (document.selection) {
            var CaretPos;
            if (textBox.createTextRange) {
                CaretPos = document.selection.createRange().duplicate();
                CaretPos.text = text;
            }
            console.log("section - " + CaretPos.text);
            //handling of ENTER in IE for textarea needs to be handled
            //alert("CaretPos="+CaretPos.text);
        } else if (txtarea.selectionStart || txtarea.selectionStart == "0") {
            var startPos = txtarea.selectionStart;
            var endPos = txtarea.selectionEnd;
            var scrollTop = txtarea.scrollTop;
            var myText = txtarea.value.substring(startPos, endPos);
            //alert("myText="+myText);
            if (!myText) {
                myText = text;
            }
            txtarea.value =
                txtarea.value.substring(0, startPos) +
                text +
                txtarea.value.substring(endPos, txtarea.value.length);
            txtarea.focus();
            var cPos = startPos + text.length;
            txtarea.selectionStart = cPos;
            txtarea.selectionEnd = cPos;
            txtarea.scrollTop = scrollTop;
            console.log("not selction - " + cPos + " - " + txtarea.value);
            props.inputUrdu(props.inputkey,txtarea.value)
        }
    }

    const submit = () => {
        console.log("submit file - " + textBox.text + " --- \n - " + document.selection);
        console.log("final urdu text = " + urdu);
    };
    console.log(props.inputkey)
    return (
        <>
            
                <input
                    className='form-control'
                    id="txtBox"
                    name="txtBox"
                    type="text"
                    dir="rtl"
                    style={{ backgroundColor: "#CCFFCC" }}
                    ref={textBox}
                    defaultValue={props.inputvalue}
                    placeholder='Enter Title In Urdu'
                />
                
        </>
    )
}
