var restaurantFoods;
var restaurantOffs;

const inputs = document.querySelectorAll(".input");

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value === "") {
        parent.classList.remove("focus");
    }
}

// function sha256(ascii){
//         function rightRotate(value, amount) {
//             return (value>>>amount) | (value<<(32 - amount));
//         };

//         var mathPow = Math.pow;
//         var maxWord = mathPow(2, 32);
//         var lengthProperty = 'length'
//         var i, j; // Used as a counter across the whole file
//         var result = ''

//         var words = [];
//         var asciiBitLength = ascii[lengthProperty]*8;

//         //* caching results is optional - remove/add slash from front of this line to toggle
//         // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
//         // (we actually calculate the first 64, but extra values are just ignored)
//         var hash = sha256.h = sha256.h || [];
//         // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
//         var k = sha256.k = sha256.k || [];
//         var primeCounter = k[lengthProperty];
//         /*/
//         var hash = [], k = [];
//         var primeCounter = 0;
//         //*/

//         var isComposite = {};
//         for (var candidate = 2; primeCounter < 64; candidate++) {
//             if (!isComposite[candidate]) {
//                 for (i = 0; i < 313; i += candidate) {
//                     isComposite[i] = candidate;
//                 }
//                 hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
//                 k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
//             }
//         }

//         ascii += '\x80' // Append Ƈ' bit (plus zero padding)
//         while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
//         for (i = 0; i < ascii[lengthProperty]; i++) {
//             j = ascii.charCodeAt(i);
//             if (j>>8) return; // ASCII check: only accept characters in range 0-255
//             words[i>>2] |= j << ((3 - i)%4)*8;
//         }
//         words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
//         words[words[lengthProperty]] = (asciiBitLength)

//         // process each chunk
//         for (j = 0; j < words[lengthProperty];) {
//             var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
//             var oldHash = hash;
//             // This is now the undefinedworking hash", often labelled as variables a...g
//             // (we have to truncate as well, otherwise extra entries at the end accumulate
//             hash = hash.slice(0, 8);

//             for (i = 0; i < 64; i++) {
//                 var i2 = i + j;
//                 // Expand the message into 64 words
//                 // Used below if 
//                 var w15 = w[i - 15], w2 = w[i - 2];

//                 // Iterate
//                 var a = hash[0], e = hash[4];
//                 var temp1 = hash[7]
//                     + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
//                     + ((e&hash[5])^((~e)&hash[6])) // ch
//                     + k[i]
//                     // Expand the message schedule if needed
//                     + (w[i] = (i < 16) ? w[i] : (
//                             w[i - 16]
//                             + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
//                             + w[i - 7]
//                             + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
//                         )|0
//                     );
//                 // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
//                 var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
//                     + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj

//                 hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
//                 hash[4] = (hash[4] + temp1)|0;
//             }

//             for (i = 0; i < 8; i++) {
//                 hash[i] = (hash[i] + oldHash[i])|0;
//             }
//         }

//         for (i = 0; i < 8; i++) {
//             for (j = 3; j + 1; j--) {
//                 var b = (hash[i]>>(j*8))&255;
//                 result += ((b < 16) ? 0 : '') + b.toString(16);
//             }
//         }

//         return result;
//     }


inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});

let username = document.getElementById("login_username");

username.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("login_btn").click();
    }
});

let password = document.getElementById("login_password");

password.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("login_btn").click();
    }
});

document.getElementById("login_btn").addEventListener("click", e => {
    e.preventDefault();
    let username = document.getElementById("login_username").value;
    let password = document.getElementById("login_password").value;
    if (username.length === 0) {
        Swal.fire(
            'خطا',
            'نام کاربری را وارد کنید',
            'error'
        )

    } else if (password.length === 0) {
        Swal.fire(
            'خطا',
            'کلمه عبور را وارد کنید',
            'error'
        )
    } else if (password.length < 8) {
        Swal.fire(
            'خطا',
            'کلمه عبور باید حداقل شامل هشت کاراکتر باشد',
            'error'
        )
    } else {
        var hash = 0, i, chr;
        for (i = 0; i < username.length; i++) {
            chr = username.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }

        $.ajax({
            url: 'https://lexeen-service.ir/api/panel_api/user_api/login.php',
            type: 'post',
            data: {
                username: username,
                password: password,
                uniqueid: 'LEXIN_TOKEN_' + hash + '_'
            },
            success: function (data, textStatus, jQxhr) {
                data = JSON.parse(data);
                switch (data['code']) {
                    case 200:
                        let shared_key = data['shared_key'];
                        // let hashedPassword = sha256(shared_key);
                        // let secret = hashedPassword.substring(0, 16);
                        // let iv = hashedPassword.substring(hashedPassword.length - 16, hashedPassword.length);
                        eraseCookie('Lexin_Token');
                        setCookie('Lexin_Token', data['token'], 1);
                        // setCookie('SECRET',secret,1);
                        // setCookie('IV',iv,1);

                        window.location = 'https://panel.lexeen-service.ir/admin';
                        break

                    case 100:
                        Swal.fire(
                            'خطا',
                            data['message'],
                            'error'
                        )
                        break
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert(JSON.stringify(jqXhr) + "," + JSON.stringify(textStatus) + "," + JSON.stringify(errorThrown));
            }
        });
    }
})
