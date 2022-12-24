var chars = '';
var specialChars = "اأإآدذرزوؤء";
specialChars += String.fromCharCode(0xFEFC,0xFEFB,0xFEF8,0xFEF7,0xFEFA,0xFEF9,0xFEF6,0xFEF5);
function parseArabic(input) {
	chars = input;
	var string = "";
	var toggleTag = false;
	for (i=0; i<input.length; i++) {
		if (input.charAt(i-1) == ">") {
			toggleTag = false;
		}
		if (input.charAt(i) == "<") {
			toggleTag = true;
		}
		if (toggleTag) {
			string += input.charAt(i);
		} else {
			string += getCharState(i);
		}
	}
	return string;
}
function getCharState(i) {
	var string;
	switch (chars.charAt(i)) {
		case "ا":
		string = setChar(i, String.fromCharCode(0xFE8D), String.fromCharCode(0xFE8D), String.fromCharCode(0xFE8E), String.fromCharCode(0xFE8E));
		break;
		case "أ":
		string = setChar(i, String.fromCharCode(0xFE83), String.fromCharCode(0xFE83), String.fromCharCode(0xFE84), String.fromCharCode(0xFE84));
		break;
		case "إ":
		string = setChar(i, String.fromCharCode(0xFE87), String.fromCharCode(0xFE87), String.fromCharCode(0xFE88), String.fromCharCode(0xFE88));
		break;
		case "آ":
		string = setChar(i, String.fromCharCode(0xFE81), String.fromCharCode(0xFE81), String.fromCharCode(0xFE82), String.fromCharCode(0xFE82));
		break;
		case "ب":
		string = setChar(i, String.fromCharCode(0xFE8F), String.fromCharCode(0xFE91), String.fromCharCode(0xFE92), String.fromCharCode(0xFE90));
		break;
		case "ت":
		string = setChar(i, String.fromCharCode(0xFE95), String.fromCharCode(0xFE97), String.fromCharCode(0xFE98), String.fromCharCode(0xFE96));
		break;
		case "ث":
		string = setChar(i, String.fromCharCode(0xFE99), String.fromCharCode(0xFE9B), String.fromCharCode(0xFE9C), String.fromCharCode(0xFE9A));
		break;
		case "ج":
		string = setChar(i, String.fromCharCode(0xFE9D), String.fromCharCode(0xFE9F), String.fromCharCode(0xFEA0), String.fromCharCode(0xFE9E));
		break;
		case "ح":
		string = setChar(i, String.fromCharCode(0xFEA1), String.fromCharCode(0xFEA3), String.fromCharCode(0xFEA4), String.fromCharCode(0xFEA2));
		break;
		case "خ":
		string = setChar(i, String.fromCharCode(0xFEA5), String.fromCharCode(0xFEA7), String.fromCharCode(0xFEA8), String.fromCharCode(0xFEA6));
		break;
		case "د":
		string = setChar(i, String.fromCharCode(0xFEA9), String.fromCharCode(0xFEA9), String.fromCharCode(0xFEAA), String.fromCharCode(0xFEAA));
		break;
		case "ذ":
		string = setChar(i, String.fromCharCode(0xFEAB), String.fromCharCode(0xFEAB), String.fromCharCode(0xFEAC), String.fromCharCode(0xFEAC));
		break;
		case "ر":
		string = setChar(i, String.fromCharCode(0xFEAD), String.fromCharCode(0xFEAD), String.fromCharCode(0xFEAE), String.fromCharCode(0xFEAE));
		break;
		case "ز":
		string = setChar(i, String.fromCharCode(0xFEAF), String.fromCharCode(0xFEAF), String.fromCharCode(0xFEB0), String.fromCharCode(0xFEB0));
		break;
		case "س":
		string = setChar(i, String.fromCharCode(0xFEB1), String.fromCharCode(0xFEB3), String.fromCharCode(0xFEB4), String.fromCharCode(0xFEB2));
		break;
		case "ش":
		string = setChar(i, String.fromCharCode(0xFEB5), String.fromCharCode(0xFEB7), String.fromCharCode(0xFEB8), String.fromCharCode(0xFEB6));
		break;
		case "ص":
		string = setChar(i, String.fromCharCode(0xFEB9), String.fromCharCode(0xFEBB), String.fromCharCode(0xFEBC), String.fromCharCode(0xFEBA));
		break;
		case "ض":
		string = setChar(i, String.fromCharCode(0xFEBD), String.fromCharCode(0xFEBF), String.fromCharCode(0xFEC0), String.fromCharCode(0xFEBE));
		break;
		case "ط":
		string = setChar(i, String.fromCharCode(0xFEC1), String.fromCharCode(0xFEC3), String.fromCharCode(0xFEC4), String.fromCharCode(0xFEC2));
		break;
		case "ظ":
		string = setChar(i, String.fromCharCode(0xFEC5), String.fromCharCode(0xFEC7), String.fromCharCode(0xFEC8), String.fromCharCode(0xFEC6));
		break;
		case "ع":
		string = setChar(i, String.fromCharCode(0xFEC9), String.fromCharCode(0xFECB), String.fromCharCode(0xFECC), String.fromCharCode(0xFECA));
		break;
		case "غ":
		string = setChar(i, String.fromCharCode(0xFECD), String.fromCharCode(0xFECF), String.fromCharCode(0xFED0), String.fromCharCode(0xFECE));
		break;
		case "ف":
		string = setChar(i, String.fromCharCode(0xFED1), String.fromCharCode(0xFED3), String.fromCharCode(0xFED4), String.fromCharCode(0xFED2));
		break;
		case "ق":
		string = setChar(i, String.fromCharCode(0xFED5), String.fromCharCode(0xFED7), String.fromCharCode(0xFED8), String.fromCharCode(0xFED6));
		break;
		case "ك":
		string = setChar(i, String.fromCharCode(0xFED9), String.fromCharCode(0xFEDB), String.fromCharCode(0xFEDC), String.fromCharCode(0xFEDA));
		break;
		case "ل":
		string = setChar(i, String.fromCharCode(0xFEDD), String.fromCharCode(0xFEDF), String.fromCharCode(0xFEE0), String.fromCharCode(0xFEDE));
		break;
		case "م":
		string = setChar(i, String.fromCharCode(0xFEE1), String.fromCharCode(0xFEE3), String.fromCharCode(0xFEE4), String.fromCharCode(0xFEE2));
		break;
		case "ن":
		string = setChar(i, String.fromCharCode(0xFEE5), String.fromCharCode(0xFEE7), String.fromCharCode(0xFEE8), String.fromCharCode(0xFEE6));
		break;
		case "ه":
		string = setChar(i, String.fromCharCode(0xFEE9), String.fromCharCode(0xFEEB), String.fromCharCode(0xFEEC), String.fromCharCode(0xFEEA));
		break;
		case "ة":
		string = setChar(i, String.fromCharCode(0xFE93), "", "", String.fromCharCode(0xFE94));
		break;
		case "و":
		string = setChar(i, String.fromCharCode(0xFEED), String.fromCharCode(0xFEED), String.fromCharCode(0xFEEE), String.fromCharCode(0xFEEE));
		break;
		case "ؤ":
		string = setChar(i, String.fromCharCode(0xFE85), String.fromCharCode(0xFE85), String.fromCharCode(0xFE86), String.fromCharCode(0xFE86));
		break;
		case "ى":
		string = setChar(i, String.fromCharCode(0xFEEF), String.fromCharCode(0xFEEF), String.fromCharCode(0xFEF0), String.fromCharCode(0xFEF0));
		break;
		case "ي":
		string = setChar(i, String.fromCharCode(0xFEF1), String.fromCharCode(0xFEF3), String.fromCharCode(0xFEF4), String.fromCharCode(0xFEF2));
		break;
		case "ئ":
		string = setChar(i, String.fromCharCode(0xFE89), String.fromCharCode(0xFE8B), String.fromCharCode(0xFE8C), String.fromCharCode(0xFE8A));
		break;
		case "ء":
		string = String.fromCharCode(0xFE80);
		break;
		case "0":
		string = String.fromCharCode(0x0660);
		break;
		case "1":
		string = String.fromCharCode(0x0661);
		break;
		case "2":
		string = String.fromCharCode(0x0662);
		break;
		case "3":
		string = String.fromCharCode(0x0663);
		break;
		case "4":
		string = String.fromCharCode(0x0664);
		break;
		case "5":
		string = String.fromCharCode(0x0665);
		break;
		case "6":
		string = String.fromCharCode(0x0666);
		break;
		case "7":
		string = String.fromCharCode(0x0667);
		break;
		case "8":
		string = String.fromCharCode(0x0668);
		break;
		case "9":
		string = String.fromCharCode(0x0669);
		break;
		case "?":
		string = String.fromCharCode(0x061F);
		break;
		case ",":
		string = String.fromCharCode(0x060C);
		break;
		case ";":
		string = String.fromCharCode(0x061B);
		break;
		case "%":
		string = String.fromCharCode(0x066A);
		break;
		default:
		string = chars.charAt(i);
		break;
	}
	return string;
}
function setChar(i, solo, begin, middle, end) {
	var string = "";
	// detect lam-alef (ﻻ) cases
	if (chars.charAt(i) == "ل" && chars.charAt(i+1) == "ا") {
		if (validateArabicChar(i-1) && specialChars.indexOf(chars.charAt(i-1)) == -1) {
			string = String.fromCharCode(0xFEFC);
		} else {
			string = String.fromCharCode(0xFEFB);
		}
		chars = chars.substring(0, i)+string+chars.substring(i+2, chars.length);
	} else if (chars.charAt(i) == "ل" && chars.charAt(i+1) == "أ") {
		if (validateArabicChar(i-1) && specialChars.indexOf(chars.charAt(i-1)) == -1) {
			string = String.fromCharCode(0xFEF8);
		} else {
			string = String.fromCharCode(0xFEF7);
		}
		chars = chars.substring(0, i)+string+chars.substring(i+2, chars.length);
	} else if (chars.charAt(i) == "ل" && chars.charAt(i+1) == "إ") {
		if (validateArabicChar(i-1) && specialChars.indexOf(chars.charAt(i-1)) == -1) {
			string = String.fromCharCode(0xFEFA);
		} else {
			string = String.fromCharCode(0xFEF9);
		}
		chars = chars.substring(0, i)+string+chars.substring(i+2, chars.length);
	} else if (chars.charAt(i) == "ل" && chars.charAt(i+1) == "آ") {
		if (validateArabicChar(i-1) && specialChars.indexOf(chars.charAt(i-1)) == -1) {
			string = String.fromCharCode(0xFEF6);
		} else {
			string = String.fromCharCode(0xFEF5);
		}
		chars = chars.substring(0, i)+string+chars.substring(i+2, chars.length);
	} else {
		// check for arabic character position in word (solo, begin, middle, end)
		if (i == 0) {
			if (specialChars.indexOf(chars.charAt(i)) != -1 || !validateArabicChar(i+1)) {
				string = solo;
			} else {
				string = begin;
			}
		} else if (i == chars.length-1) {
			if (specialChars.indexOf(chars.charAt(i-1)) != -1 || !validateArabicChar(i-1)) {
				string = solo;
			} else {
				string = end;
			}
		} else if (validateArabicChar(i-1) && validateArabicChar(i+1)) {
			if (specialChars.indexOf(chars.charAt(i-1)) != -1) {
				if (specialChars.indexOf(chars.charAt(i)) != -1) {
					string = solo;
				} else {
					string = begin;
				}
			} else {
				if (specialChars.indexOf(chars.charAt(i)) != -1 || chars.charAt(i+1) == "ء" || chars.charAt(i) == "ة") {
					if (chars.charAt(i-1) != "ة") {
						string = end;
					} else {
						string = begin;
					}
				} else {
					if (chars.charAt(i-1) != "ة") {
						string = middle;
					} else {
						string = begin;
					}
				}
			}
		} else {
			if (validateArabicChar(i-1) && !validateArabicChar(i+1)) {
				if (specialChars.indexOf(chars.charAt(i-1)) != -1) {
					string = solo;
				} else {
					string = end;
				}
			} else if (!validateArabicChar(i-1) && validateArabicChar(i+1)) {
				if (specialChars.indexOf(chars.charAt(i)) != -1) {
					string = solo;
				} else {
					string = begin;
				}
			} else if (!validateArabicChar(i-1) && !validateArabicChar(i+1)) {
				string = solo;
			}
		}
	}
	return string;
}
function validateArabicChar(i) {
	var valid = false;
	if (i>=0 && i<chars.length) {
		var code = chars.charCodeAt(i);
		if (code >= 1570 && code <= 1594 || code >= 1600 && code <= 1610 || code >= 65154 && code <= 65276) {
			valid = true;
		}
	}
	return valid;
}