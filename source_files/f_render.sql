function f_render (
    p_dynamic_action   in apex_plugin.t_dynamic_action,
    p_plugin           in apex_plugin.t_plugin
) return apex_plugin.t_dynamic_action_render_result as
    l_result         apex_plugin.t_dynamic_action_render_result;
    p_column_id         constant varchar2(32767) := p_dynamic_action.attribute_01;
    p_handler_on        constant varchar2(32767) := p_dynamic_action.attribute_02;
    p_custom_handler    constant varchar2(32767) := p_dynamic_action.attribute_03;
    p_placeholder_class constant varchar2(32767) := p_dynamic_action.attribute_04;
begin

    l_result.javascript_function   := '
    function () { 
           pretiusInteractiveGridSort.initialize(this, ' ||
           apex_javascript.add_value( p_dynamic_action.attribute_01, true ) ||
           apex_javascript.add_value( p_dynamic_action.attribute_02, true ) ||
           apex_javascript.add_value( p_dynamic_action.attribute_03, true ) ||
           apex_javascript.add_value( p_dynamic_action.attribute_04, true ) ||
           '); }';

    return l_result;
end;
