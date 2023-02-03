# [imports]
import time
import base64
import os, sys
from datetime import date

# [selenium]
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from webdriver_manager.chrome import ChromeDriverManager

# [chrome_options]
service = Service(ChromeDriverManager().install())
chrome_options = Options()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument('--ignore-ssl-errors=yes')
chrome_options.add_argument('--ignore-certificate-errors')
driver = webdriver.Chrome(service=service, options=chrome_options)

def main():
    delay = 7
    i = 251

    initial_date = "01/01/2023"
    final_date = "31/01/2023"

    url = f"https://www.documentos.dioe.pr.gov.br/dioe/consultaPublicaPDF.do?action=pgLocalizar&enviado=true&numero=&dataInicialEntrada={initial_date}&dataFinalEntrada={final_date}&search=&submit=Localizar&localizador="

    while i < 501:
        driver.get(url)
        time.sleep(delay)

        try:
# get the captcha image source
            xpath_expr = "//div[@id='dv_aba1']/table/tbody/tr/td[2]/table[2]/tbody/tr/td/img"
            img = WebDriverWait(driver, delay).until(
                    EC.presence_of_element_located((By.XPATH, xpath_expr)))

# download the image
            with open(f'./bd_captchas/captcha_{i}.png', 'wb') as file:
                file.write(img.screenshot_as_png)

            i += 1
        except (NoSuchElementException, TimeoutException):
            driver.refresh()

    driver.close()

if __name__ == '__main__':
    main()
