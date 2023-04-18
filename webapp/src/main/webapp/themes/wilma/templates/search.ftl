<#-- $This file is distributed under the terms of the license in LICENSE$ -->

<#--Breaking this out so this can be utilized by other pages such as the jsp advanced tools pages-->

<section id="search" role="region">
    <fieldset>
        <legend>${i18n().search_form}</legend>

        <form id="search-form" action="${urls.base}/extendedsearch" name="search" role="search" accept-charset="UTF-8" method="GET">
            <div id="search-field">
                <input type="text" name="querytext" class="search-vivo" value="${querytext!}" autocapitalize="off" />
                <input type="submit" value="${i18n().search_button}" class="search">
            </div>
        </form>
    </fieldset>
</section>

