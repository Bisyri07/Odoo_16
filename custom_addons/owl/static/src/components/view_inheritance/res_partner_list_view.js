/* @odoo-module */ 

import { registry } from '@web/core/registry';
import { listView } from '@web/views/list/list_view';
import { ListController } from '@web/views/list/list_controller';
import { useService } from '@web/core/utils/hooks';


class resPartnerListController extends ListController {
    setup(){
        super.setup()
        console.log("This is res partner controller")
        this.action = useService("action")
    }

    openSalesView(){
        console.log("open sales view works!")
        // Open a Form View
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Customer Sales",
            res_model: "sale.order",
            views: [[false, "list"], [false, "form"]],    
        })
    }

};

export const resPartnerListView = {
    ...listView,
    Controller: resPartnerListController,
    buttonTemplate: "owl.ResPartnerListView.Button",
};


registry.category("views").add("res_partner_list_view", resPartnerListView);
