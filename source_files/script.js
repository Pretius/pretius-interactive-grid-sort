const pretiusInteractiveGridSort = (function () {
  "use strict";
  const feature = "Pretius Interactive Grid Sort";

  function initializeSortableGrid(grid_id, order_column_id, handler_on, custom_handler, placeholder_class) {
    try {
      $('#' + grid_id).find("tbody").sortable({
        handle: handler_on === 'Y' ? "." + custom_handler : false,
        placeholder: placeholder_class,
        //animation: 100,
        start: function (event, ui) {
          ui.helper.addClass("sortable-helper");
        },
        stop: function (event, ui) {
          ui.item.removeClass("sortable-helper");
        },
        update: function (event, ui) {
          updateOrder(grid_id, order_column_id);
        }
      });
    } catch (e) {
      apex.debug.error(feature, "Problem with Initialization", e);
    }
  }

  function updateOrder(grid_id, order_column_id) {
    try {
      // Get the Interactive Grid widget and model
      var ig$ = apex.region(grid_id).widget();
      var model = ig$.interactiveGrid("getViews", "grid").model;

      // Get array of current values in order_column_id column
      var currentOrderArray = [];
      model.forEach(function (r) {
        var record = r;
        var order = model.getValue(record, order_column_id);
        currentOrderArray.push(order);
      });
      // Sort the current order array
      currentOrderArray.sort();
      // Iterate over each record in the model
      model.forEach(function (r) {
        var record = r;
        var recordId = model.getRecordId(record);
        var tr = $('tr[data-id="' + recordId + '"]');
        var index = tr.index();

        // Set the value of the order_column_id column for the record to the index - reuse the sorted array
        model.setValue(record, order_column_id, String(currentOrderArray[index]));
      })
    } catch (e) {
      apex.debug.error(feature, "Problem with Update of Interactive Grid", e);
    }
  }


  function moveRow(button, direction, order_column_id) {
    try {
      var current = $(button).closest('tr');
      // Find the closest interactive grid id from button
      var ig_id = current.closest('.a-IG').attr('id');
      // Remove _ig from the id
      ig_id = ig_id.replace('_ig', '');
      if (direction === 'up') {
        current.prev().before(current);
      } else {
        current.next().after(current);
      }
      updateOrder(ig_id, order_column_id);
    } catch (e) {
      apex.debug.error(feature, "Problem with moveRow function", e);
    }
  }

  return {
    initialize: function (pThis, order_column_id, handler_on, custom_handler, placeholder_class) {
      var interactiveGridID = pThis.affectedElements[0].id;

      initializeSortableGrid(interactiveGridID, order_column_id, handler_on, custom_handler, placeholder_class);
    },
    moveRow: function (buton, direction, order_column_id) {
      moveRow(buton, direction, order_column_id);
    },
    updateOrder: function (grid_id, order_column_id) {
      updateOrder(grid_id, order_column_id);
    }
  };
})();
