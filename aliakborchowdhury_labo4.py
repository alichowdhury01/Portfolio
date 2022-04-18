def atm():
    def input_account():
        account = input("Enter your 4 digits account number:")
        psw = input("Enter your password:")
        return account, psw

    account, psw = input_account()

    def account_selection():
        account_type = input(("ACCOUNT:\n"
                              "1. Checking account\n"
                              "2. Saving account\n"
                              "3. Investment account\n"
                              "Please chose your account: "))
        return account_type

    account_user_selected = account_selection()

    def operation():
        user_operation = input("ACCOUNT OPERATION:\n"
                               "1. Deposit\n"
                               "2. Withdraw\n"
                               "3. Return on your investment\n"
                               "4. Change account\n"
                               "5. Done\n"
                               "Please choose your operation: ")
        return user_operation

    user_operation_selected = operation()

    def algo_encryption(list_cut):
        vowel_a = "a"
        vowel_e = "e"
        vowel_i = "i"
        vowel_o = "o"
        vowel_u = "u"
        list_vowels = [vowel_a, vowel_e, vowel_i, vowel_o, vowel_u]

        list_vowels[0] = "@"
        list_vowels[1] = "&"
        list_vowels[2] = "&"
        list_vowels[3] = "$"
        list_vowels[4] = "#"
        encryption_list = []
        return encryption_list

    algo_encryption()

    def algo_decryption(list_in):
        symbol1 = "@"
        symbol2 = "&"
        symbol3 = "&"
        symbol4 = "$"
        symbol5 = "#"
        list_symbols = [symbol1, symbol2, symbol3, symbol4, symbol5]

        list_symbols[0] = "a"
        list_symbols[1] = "e"
        list_symbols[2] = "i"
        list_symbols[3] = "o"
        list_symbols[4] = "u"
        decryption_list = []
        return decryption_list

    algo_decryption()

    def account_db():
        cx1 = ['1234', 'voiture1', '100', '1000', '10000', '1.018']
        cx2 = ['3456', 'chat123', '150', '2000', '25000', '1.03']
        cx3 = ['3333', '1234', '5', '100', '1000', '1.15']
        cx4 = ['0000', 'admin', '0', '0', '0', '0']
        list_cx = [cx1, cx2, cx3, cx4]
        # list_cx = algo_encryption(list_cx)
        f = open("bd_cx.txt", "w", encoding="utf8")
        for user in list_cx:
            f.write(' '.join(user) + '\n')
        f.close()
        return
    account_db()

    


atm()

