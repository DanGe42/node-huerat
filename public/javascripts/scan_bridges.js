$(document).ready(function() {
    $.getJSON('/hue/bridges', function(data) {
        // Populate table with bridges found
        var bridges = data['bridges'];
        if (bridges.length) {
            var table = $('<table class="table table-striped"></table>');
            for (var i = 0; i < bridges.length; i += 1) {
                table.append(makeBridgeTableRow(bridges[i]));
            }
            $('#bridgeList').html(table);
        } else {
            $('#bridgeList').html('<p>No bridges found.</p>');
        }

        // Add click handlers to connect buttons added with each bridge
        $('.connect').click(function(e) {
            var $this = $(this);
            var action = $this.data('url');

            $this.button('loading');
            $.ajax(action, {
                dataType: 'json',
                type: 'POST',
                success: function(data) {
                    $this.button('reset');
                    if (data.code === 1) {
                        $('#linkButtonModal').modal('show');
                        return;
                    }

                    $this.removeClass('btn-primary');
                    $this.addClass('btn-success');
                    $this.unbind('click');
                    $this.attr('disabled', true);
                    $this.button('completed');
                }
            });

            e.preventDefault();
        });
    });

    function makeBridgeTableRow (bridge) {
        var connectURL = '/hue/bridge/' + bridge.ipaddress + '/connect';
        var button = '<button type="button" data-url="' + connectURL +
            '" class="btn btn-primary connect" data-loading-text="Connecting..."' +
            ' data-completed-text="Connected" autocomplete=off>Connect</a>';
        var html = '<tr><td>' + button + '</td><td>' + bridge.ipaddress + '</td>' +
            '<td>' + bridge.id + '</td></tr>';
        return html;
    }
});