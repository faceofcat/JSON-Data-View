/// <reference path="../datacategorylayout.ts" />

namespace net.ndrei.json.datacategorylayouts {
    export class CategoryJsonLayout implements DataCategoryLayout {
        private container: JQuery;
        private ul: JQuery;
        private endTag: JQuery;

        constructor(private readonly label: string) {
        }

        public initialize(container: JQuery): BaseLayout {
            this.container = container;
            this.container.addClass('category-json');

            // start
            const title = $('<div class="category-json-title" />'); 
            const expander = $('<span class="category-toggler category-collapser">-</span>');
            expander.click(() => { this.toggleCollapseState(); });
            title.append(expander);
            if (this.label && this.label.length) {
                title.append($(`<span class="category-label category-json-label">${this.label}: </span>`));
            }
            title.append($('<span class="category-content-marker">{</span>'));
            this.container.append(title);

            // content
            this.ul = $('<ul class="category-list category-json" />');
            this.ul.data({ layout: this });
            this.container.append(this.ul);

            // end
            this.container.append(this.endTag = $('<div class="category-json-title category-json-endtag">}</div>'));

            return this;
        }

        private toggleCollapseState() {
            const marker = this.container.find('> div:first-child > .category-content-marker');
            const toggler = this.container.find('> div:first-child > .category-toggler');
            if (marker.hasClass('collapsed')) {
                marker.removeClass('collapsed');
                marker.text('{');
                this.ul.show();
                this.endTag.show();

                toggler && (toggler.removeClass('category-expander'), toggler.addClass('category-collapser'), toggler.text('-'));
            }
            else {
                marker.addClass('collapsed');
                marker.html('{&nbsp;..&nbsp;}');
                this.ul.hide();
                this.endTag.hide();

                toggler && (toggler.addClass('category-expander'), toggler.removeClass('category-collapser'), toggler.text('+'));
            }
        }

        addData(data: DataLayout): DataCategoryLayout {
            const li = $('<li />');
            this.ul.append(li);
            data.initialize(li);
            li.data({ layout: data });
            return this;
        }
    }
}

net.ndrei.json.dataCategoryLayoutRegistry['json'] = (label: string) =>
    new net.ndrei.json.datacategorylayouts.CategoryJsonLayout(label);
