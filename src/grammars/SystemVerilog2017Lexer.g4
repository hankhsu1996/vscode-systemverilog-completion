
/*
 * SystemVerilog IEEE1800-2017 standard grammar
 *
 * This grammar is generated by hdlConvertor/utils/sv/main.py from the PDF with SystemVerilog IEEE1800-2017 standard.
 * The grammar is target language dependent, but mentioned script can generate grammar for multiple target languages (java, python, c++).
 **/
lexer grammar SystemVerilog2017Lexer;

@lexer::header {
enum Language {
	VHDL = 0,
	VERILOG1995 = 1,
	VERILOG2001 = 2,
	VERILOG2001_NOCONFIG = 3,
	VERILOG2005 = 4,
	VERILOG = VERILOG2001,
	SV2005 = 5,
	SV2009 = 6,
	SV2012 = 7,
	SV2017 = 8,
	SYSTEM_VERILOG = SV2017,
	HWT = 9,
	// [note] the size of this enum is made larger than 1B in order to avoid warnings
	// in cython generated code
	INVALID = 1 << 31,
}
}
@lexer::members {
private language_version = Language.SV2017;
}
KW_DOLAR_SDF_ANNOTATE: '$sdf_annotate';
KW_DOLAR_DISPLAY: '$display';
KW_DOLAR_DISPLAYB: '$displayb';
KW_DOLAR_DISPLAYO: '$displayo';
KW_DOLAR_DISPLAYH: '$displayh';
KW_DOLAR_WRITE: '$write';
KW_DOLAR_WRITEB: '$writeb';
KW_DOLAR_WRITEO: '$writeo';
KW_DOLAR_WRITEH: '$writeh';
KW_DOLAR_STROBE: '$strobe';
KW_DOLAR_STROBEB: '$strobeb';
KW_DOLAR_STROBEO: '$strobeo';
KW_DOLAR_STROBEH: '$strobeh';
KW_DOLAR_MONITOR: '$monitor';
KW_DOLAR_MONITORB: '$monitorb';
KW_DOLAR_MONITORO: '$monitoro';
KW_DOLAR_MONITORH: '$monitorh';
KW_DOLAR_MONITORON: '$monitoron';
KW_DOLAR_MONITOROFF: '$monitoroff';
KW_DOLAR_FOPEN: '$fopen';
KW_DOLAR_FCLOSE: '$fclose';
KW_DOLAR_FDISPLAY: '$fdisplay';
KW_DOLAR_FDISPLAYB: '$fdisplayb';
KW_DOLAR_FDISPLAYH: '$fdisplayh';
KW_DOLAR_FDISPLAYO: '$fdisplayo';
KW_DOLAR_FWRITE: '$fwrite';
KW_DOLAR_FWRITEB: '$fwriteb';
KW_DOLAR_FWRITEH: '$fwriteh';
KW_DOLAR_FWRITEO: '$fwriteo';
KW_DOLAR_FSTROBE: '$fstrobe';
KW_DOLAR_FSTROBEB: '$fstrobeb';
KW_DOLAR_FSTROBEH: '$fstrobeh';
KW_DOLAR_FSTROBEO: '$fstrobeo';
KW_DOLAR_FMONITOR: '$fmonitor';
KW_DOLAR_FMONITORB: '$fmonitorb';
KW_DOLAR_FMONITORO: '$fmonitoro';
KW_DOLAR_FMONITORH: '$fmonitorh';
KW_DOLAR_SWRITE: '$swrite';
KW_DOLAR_SWRITEB: '$swriteb';
KW_DOLAR_SWRITEO: '$swriteo';
KW_DOLAR_SWRITEH: '$swriteh';
KW_DOLAR_SFORMAT: '$sformat';
KW_DOLAR_SFORMATF: '$sformatf';
KW_DOLAR_FGETC: '$fgetc';
KW_DOLAR_UNGETC: '$ungetc';
KW_DOLAR_FGETS: '$fgets';
KW_DOLAR_FSCANF: '$fscanf';
KW_DOLAR_SSCANF: '$sscanf';
KW_DOLAR_FREAD: '$fread';
KW_DOLAR_FTELL: '$ftell';
KW_DOLAR_FSEEK: '$fseek';
KW_DOLAR_REWIND: '$rewind';
KW_DOLAR_FFLUSH: '$fflush';
KW_DOLAR_FERROR: '$ferror';
KW_DOLAR_FEOF: '$feof';
KW_DOLAR_READMEMB: '$readmemb';
KW_DOLAR_READMEMH: '$readmemh';
KW_DOLAR_WRITEMEMB: '$writememb';
KW_DOLAR_WRITEMEMH: '$writememh';
KW_DOLAR_TESTPLUSARGS: '$test$plusargs';
KW_DOLAR_VALUEPLUSARGS: '$value$plusargs';
KW_DOLAR_DUMPFILE: '$dumpfile';
KW_DOLAR_DUMPVARS: '$dumpvars';
KW_DOLAR_DUMPOFF: '$dumpoff';
KW_DOLAR_DUMPON: '$dumpon';
KW_DOLAR_DUMPALL: '$dumpall';
KW_DOLAR_DUMPLIMIT: '$dumplimit';
KW_DOLAR_DUMPFLUSH: '$dumpflush';
KW_DOLAR_DUMPPORTS: '$dumpports';
KW_DOLAR_DUMPPORTSOFF: '$dumpportsoff';
KW_DOLAR_DUMPPORTSON: '$dumpportson';
KW_DOLAR_DUMPPORTSALL: '$dumpportsall';
KW_DOLAR_DUMPPORTSLIMIT: '$dumpportslimit';
KW_DOLAR_DUMPPORTSFLUSH: '$dumpportsflush';
KW_DOLAR_COUNTDRIVERS: '$countdrivers';
KW_DOLAR_GETPATTERN: '$getpattern';
KW_DOLAR_INPUT: '$input';
KW_DOLAR_KEY: '$key';
KW_DOLAR_NOKEY: '$nokey';
KW_DOLAR_LIST: '$list';
KW_DOLAR_LOG: '$log';
KW_DOLAR_NOLOG: '$nolog';
KW_DOLAR_RESET: '$reset';
KW_DOLAR_RESET_COUNT: '$reset_count';
KW_DOLAR_RESET_VALUE: '$reset_value';
KW_DOLAR_SAVE: '$save';
KW_DOLAR_INCSAVE: '$incsave';
KW_DOLAR_RESTART: '$restart';
KW_DOLAR_SCALE: '$scale';
KW_DOLAR_SCOPE: '$scope';
KW_DOLAR_SHOWSCOPES: '$showscopes';
KW_DOLAR_SHOWVARS: '$showvars';
KW_DOLAR_SREADMEMB: '$sreadmemb';
KW_DOLAR_SREADMEMH: '$sreadmemh';
KW_DOLAR_FINISH: '$finish';
KW_DOLAR_STOP: '$stop';
KW_DOLAR_EXIT: '$exit';
KW_DOLAR_TIME: '$time';
KW_DOLAR_STIME: '$stime';
KW_DOLAR_REALTIME: '$realtime';
KW_DOLAR_PRINTTIMESCALE: '$printtimescale';
KW_DOLAR_TIMEFORMAT: '$timeformat';
KW_DOLAR_RTOI: '$rtoi';
KW_DOLAR_ITOR: '$itor';
KW_DOLAR_REALTOBITS: '$realtobits';
KW_DOLAR_BITSTOREAL: '$bitstoreal';
KW_DOLAR_SHORTREALTOBITS: '$shortrealtobits';
KW_DOLAR_BITSTOSHORTREAL: '$bitstoshortreal';
KW_DOLAR_SIGNED: '$signed';
KW_DOLAR_UNSIGNED: '$unsigned';
KW_DOLAR_CAST: '$cast';
KW_DOLAR_TYPENAME: '$typename';
KW_DOLAR_BITS: '$bits';
KW_DOLAR_ISUNBOUNDED: '$isunbounded';
KW_DOLAR_LEFT: '$left';
KW_DOLAR_RIGHT: '$right';
KW_DOLAR_INCREMENT: '$increment';
KW_DOLAR_LOW: '$low';
KW_DOLAR_HIGH: '$high';
KW_DOLAR_SIZE: '$size';
KW_DOLAR_DIMENSIONS: '$dimensions';
KW_DOLAR_UNPACKED_DIMENSIONS: '$unpacked_dimensions';
KW_DOLAR_CLOG2: '$clog2';
KW_DOLAR_LN: '$ln';
KW_DOLAR_LOG10: '$log10';
KW_DOLAR_EXP: '$exp';
KW_DOLAR_SQRT: '$sqrt';
KW_DOLAR_POW: '$pow';
KW_DOLAR_FLOOR: '$floor';
KW_DOLAR_CEIL: '$ceil';
KW_DOLAR_SIN: '$sin';
KW_DOLAR_COS: '$cos';
KW_DOLAR_TAN: '$tan';
KW_DOLAR_ASIN: '$asin';
KW_DOLAR_ACOS: '$acos';
KW_DOLAR_ATAN: '$atan';
KW_DOLAR_ATAN2: '$atan2';
KW_DOLAR_HYPOT: '$hypot';
KW_DOLAR_SINH: '$sinh';
KW_DOLAR_COSH: '$cosh';
KW_DOLAR_TANH: '$tanh';
KW_DOLAR_ASINH: '$asinh';
KW_DOLAR_ACOSH: '$acosh';
KW_DOLAR_ATANH: '$atanh';
KW_DOLAR_COUNTBITS: '$countbits';
KW_DOLAR_COUNTONES: '$countones';
KW_DOLAR_ONEHOT: '$onehot';
KW_DOLAR_ONEHOT0: '$onehot0';
KW_DOLAR_ISUNKNOWN: '$isunknown';
KW_DOLAR_ASSERTCONTROL: '$assertcontrol';
KW_DOLAR_ASSERTON: '$asserton';
KW_DOLAR_ASSERTOFF: '$assertoff';
KW_DOLAR_ASSERTKILL: '$assertkill';
KW_DOLAR_ASSERTPASSON: '$assertpasson';
KW_DOLAR_ASSERTPASSOFF: '$assertpassoff';
KW_DOLAR_ASSERTFAILON: '$assertfailon';
KW_DOLAR_ASSERTFAILOFF: '$assertfailoff';
KW_DOLAR_ASSERTNONVACUOUSON: '$assertnonvacuouson';
KW_DOLAR_ASSERTNONVACUOUSOFF: '$assertnonvacuousoff';
KW_DOLAR_SAMPLED: '$sampled';
KW_DOLAR_ROSE: '$rose';
KW_DOLAR_FELL: '$fell';
KW_DOLAR_STABLE: '$stable';
KW_DOLAR_CHANGED: '$changed';
KW_DOLAR_PAST: '$past';
KW_DOLAR_PAST_GCLK: '$past_gclk';
KW_DOLAR_ROSE_GCLK: '$rose_gclk';
KW_DOLAR_FELL_GCLK: '$fell_gclk';
KW_DOLAR_STABLE_GCLK: '$stable_gclk';
KW_DOLAR_CHANGED_GCLK: '$changed_gclk';
KW_DOLAR_FUTURE_GCLK: '$future_gclk';
KW_DOLAR_RISING_GCLK: '$rising_gclk';
KW_DOLAR_FALLING_GCLK: '$falling_gclk';
KW_DOLAR_STEADY_GCLK: '$steady_gclk';
KW_DOLAR_CHANGING_GCLK: '$changing_gclk';
KW_DOLAR_COVERAGE_CONTROL: '$coverage_control';
KW_DOLAR_COVERAGE_GET_MAX: '$coverage_get_max';
KW_DOLAR_COVERAGE_GET: '$coverage_get';
KW_DOLAR_COVERAGE_MERGE: '$coverage_merge';
KW_DOLAR_COVERAGE_SAVE: '$coverage_save';
KW_DOLAR_SET_COVERAGE_DB_NAME: '$set_coverage_db_name';
KW_DOLAR_LOAD_COVERAGE_DB: '$load_coverage_db';
KW_DOLAR_GET_COVERAGE: '$get_coverage';
KW_DOLAR_RANDOM: '$random';
KW_DOLAR_URANDOM: '$urandom';
KW_DOLAR_URANDOM_RANGE: '$urandom_range';
KW_DOLAR_DIST_UNIFORM: '$dist_uniform';
KW_DOLAR_DIST_NORMAL: '$dist_normal';
KW_DOLAR_DIST_EXPONENTIAL: '$dist_exponential';
KW_DOLAR_DIST_POISSON: '$dist_poisson';
KW_DOLAR_DIST_CHI_SQUARE: '$dist_chi_square';
KW_DOLAR_DIST_T: '$dist_t';
KW_DOLAR_DIST_ERLANG: '$dist_erlang';
KW_DOLAR_Q_INITIALIZE: '$q_initialize';
KW_DOLAR_Q_ADD: '$q_add';
KW_DOLAR_Q_REMOVE: '$q_remove';
KW_DOLAR_Q_FULL: '$q_full';
KW_DOLAR_Q_EXAM: '$q_exam';
KW_DOLAR_ASYNCANDARRAY: '$async$and$array';
KW_DOLAR_SYNCANDARRAY: '$sync$and$array';
KW_DOLAR_ASYNCNANDARRAY: '$async$nand$array';
KW_DOLAR_SYNCNANDARRAY: '$sync$nand$array';
KW_DOLAR_ASYNCORARRAY: '$async$or$array';
KW_DOLAR_SYNCORARRAY: '$sync$or$array';
KW_DOLAR_ASYNCNORARRAY: '$async$nor$array';
KW_DOLAR_SYNCNORARRAY: '$sync$nor$array';
KW_DOLAR_ASYNCANDPLANE: '$async$and$plane';
KW_DOLAR_SYNCANDPLANE: '$sync$and$plane';
KW_DOLAR_ASYNCNANDPLANE: '$async$nand$plane';
KW_DOLAR_SYNCNANDPLANE: '$sync$nand$plane';
KW_DOLAR_ASYNCORPLANE: '$async$or$plane';
KW_DOLAR_SYNCORPLANE: '$sync$or$plane';
KW_DOLAR_ASYNCNORPLANE: '$async$nor$plane';
KW_DOLAR_SYNCNORPLANE: '$sync$nor$plane';
KW_DOLAR_SYSTEM: '$system';

KW_DOLAR_ERROR: '$error';
KW_DOLAR_FATAL: '$fatal';
KW_DOLAR_FULLSKEW: '$fullskew';
KW_DOLAR_HOLD: '$hold';
KW_DOLAR_INFO: '$info';
KW_DOLAR_NOCHANGE: '$nochange';
KW_DOLAR_PERIOD: '$period';
KW_DOLAR_RECOVERY: '$recovery';
KW_DOLAR_RECREM: '$recrem';
KW_DOLAR_REMOVAL: '$removal';
KW_DOLAR_ROOT: '$root';
KW_DOLAR_SETUP: '$setup';
KW_DOLAR_SETUPHOLD: '$setuphold';
KW_DOLAR_SKEW: '$skew';
KW_DOLAR_TIMESKEW: '$timeskew';
KW_DOLAR_UNIT: '$unit';
KW_DOLAR_WARNING: '$warning';
KW_DOLAR_WIDTH: '$width';
KW_1STEP: '1step';
KW_PATHPULSE_DOLAR: 'PATHPULSE$';
KW_ACCEPT_ON:
 'accept_on' {this.language_version >= Language.SV2009}?;
KW_ALIAS:
 'alias' {this.language_version >= Language.SV2005}?;
KW_ALWAYS: 'always';
KW_ALWAYS_COMB:
 'always_comb' {this.language_version >= Language.SV2005}?;
KW_ALWAYS_FF:
 'always_ff' {this.language_version >= Language.SV2005}?;
KW_ALWAYS_LATCH:
 'always_latch' {this.language_version >= Language.SV2005}?;
KW_AND: 'and';
KW_ASSERT:
 'assert' {this.language_version >= Language.SV2005}?;
KW_ASSIGN: 'assign';
KW_ASSUME:
 'assume' {this.language_version >= Language.SV2005}?;
KW_AUTOMATIC:
 'automatic' {this.language_version >= Language.VERILOG2001}?;
KW_BEFORE:
 'before' {this.language_version >= Language.SV2005}?;
KW_BEGIN: 'begin';
KW_BIND:
 'bind' {this.language_version >= Language.SV2005}?;
KW_BINS:
 'bins' {this.language_version >= Language.SV2005}?;
KW_BINSOF:
 'binsof' {this.language_version >= Language.SV2005}?;
KW_BIT:
 'bit' {this.language_version >= Language.SV2005}?;
KW_BREAK:
 'break' {this.language_version >= Language.SV2005}?;
KW_BUF: 'buf';
KW_BUFIF0: 'bufif0';
KW_BUFIF1: 'bufif1';
KW_BYTE:
 'byte' {this.language_version >= Language.SV2005}?;
KW_CASE: 'case';
KW_CASEX: 'casex';
KW_CASEZ: 'casez';
KW_CELL:
 'cell' {this.language_version >= Language.VERILOG2001}?;
KW_CHANDLE:
 'chandle' {this.language_version >= Language.SV2005}?;
KW_CHECKER:
 'checker' {this.language_version >= Language.SV2009}?;
KW_CLASS:
 'class' {this.language_version >= Language.SV2005}?;
KW_CLOCKING:
 'clocking' {this.language_version >= Language.SV2005}?;
KW_CMOS: 'cmos';
KW_CONFIG:
 'config' {this.language_version >= Language.VERILOG2001}?;
KW_CONST:
 'const' {this.language_version >= Language.SV2005}?;
KW_CONSTRAINT:
 'constraint' {this.language_version >= Language.SV2005}?;
KW_CONTEXT:
 'context' {this.language_version >= Language.SV2005}?;
KW_CONTINUE:
 'continue' {this.language_version >= Language.SV2005}?;
KW_COVER:
 'cover' {this.language_version >= Language.SV2005}?;
KW_COVERGROUP:
 'covergroup' {this.language_version >= Language.SV2005}?;
KW_COVERPOINT:
 'coverpoint' {this.language_version >= Language.SV2005}?;
KW_CROSS:
 'cross' {this.language_version >= Language.SV2005}?;
KW_DEASSIGN: 'deassign';
KW_DEFAULT: 'default';
KW_DEFPARAM: 'defparam';
KW_DESIGN:
 'design' {this.language_version >= Language.VERILOG2001}?;
KW_DISABLE: 'disable';
KW_DIST:
 'dist' {this.language_version >= Language.SV2005}?;
KW_DO:
 'do' {this.language_version >= Language.SV2005}?;
KW_EDGE: 'edge';
KW_ELSE: 'else';
KW_END: 'end';
KW_ENDCASE: 'endcase';
KW_ENDCHECKER:
 'endchecker' {this.language_version >= Language.SV2009}?;
KW_ENDCLASS:
 'endclass' {this.language_version >= Language.SV2005}?;
KW_ENDCLOCKING:
 'endclocking' {this.language_version >= Language.SV2005}?;
KW_ENDCONFIG:
 'endconfig' {this.language_version >= Language.VERILOG2001}?;
KW_ENDFUNCTION: 'endfunction';
KW_ENDGENERATE:
 'endgenerate' {this.language_version >= Language.VERILOG2001}?;
KW_ENDGROUP:
 'endgroup' {this.language_version >= Language.SV2005}?;
KW_ENDINTERFACE:
 'endinterface' {this.language_version >= Language.SV2005}?;
KW_ENDMODULE: 'endmodule';
KW_ENDPACKAGE:
 'endpackage' {this.language_version >= Language.SV2005}?;
KW_ENDPRIMITIVE: 'endprimitive';
KW_ENDPROGRAM:
 'endprogram' {this.language_version >= Language.SV2005}?;
KW_ENDPROPERTY:
 'endproperty' {this.language_version >= Language.SV2005}?;
KW_ENDSEQUENCE:
 'endsequence' {this.language_version >= Language.SV2005}?;
KW_ENDSPECIFY: 'endspecify';
KW_ENDTABLE: 'endtable';
KW_ENDTASK: 'endtask';
KW_ENUM:
 'enum' {this.language_version >= Language.SV2005}?;
KW_EVENT: 'event';
KW_EVENTUALLY:
 'eventually' {this.language_version >= Language.SV2009}?;
KW_EXPECT:
 'expect' {this.language_version >= Language.SV2005}?;
KW_EXPORT:
 'export' {this.language_version >= Language.SV2005}?;
KW_EXTENDS:
 'extends' {this.language_version >= Language.SV2005}?;
KW_EXTERN:
 'extern' {this.language_version >= Language.SV2005}?;
KW_FINAL:
 'final' {this.language_version >= Language.SV2005}?;
KW_FIRST_MATCH:
 'first_match' {this.language_version >= Language.SV2005}?;
KW_FOR: 'for';
KW_FORCE: 'force';
KW_FOREACH:
 'foreach' {this.language_version >= Language.SV2005}?;
KW_FOREVER: 'forever';
KW_FORK: 'fork';
KW_FORKJOIN:
 'forkjoin' {this.language_version >= Language.SV2005}?;
KW_FUNCTION: 'function';
KW_GENERATE:
 'generate' {this.language_version >= Language.VERILOG2001}?;
KW_GENVAR:
 'genvar' {this.language_version >= Language.VERILOG2001}?;
KW_GLOBAL:
 'global' {this.language_version >= Language.SV2009}?;
KW_HIGHZ0: 'highz0';
KW_HIGHZ1: 'highz1';
KW_IF: 'if';
KW_IFF:
 'iff' {this.language_version >= Language.SV2005}?;
KW_IFNONE: 'ifnone';
KW_IGNORE_BINS:
 'ignore_bins' {this.language_version >= Language.SV2005}?;
KW_ILLEGAL_BINS:
 'illegal_bins' {this.language_version >= Language.SV2005}?;
KW_IMPLEMENTS:
 'implements' {this.language_version >= Language.SV2012}?;
KW_IMPLIES:
 'implies' {this.language_version >= Language.SV2009}?;
KW_IMPORT:
 'import' {this.language_version >= Language.SV2005}?;
KW_INCDIR: 'incdir' {this.language_version >= Language.SV2005}?; // used only in sv library file
KW_INCLUDE: 'include' {this.language_version >= Language.SV2005}?; // used only in sv library file
KW_INITIAL: 'initial';
KW_INOUT: 'inout';
KW_INPUT: 'input';
KW_INSIDE:
 'inside' {this.language_version >= Language.SV2005}?;
KW_INSTANCE:
 'instance' {this.language_version >= Language.VERILOG2001}?;
KW_INT:
 'int' {this.language_version >= Language.SV2005}?;
KW_INTEGER: 'integer';
KW_INTERCONNECT:
 'interconnect' {this.language_version >= Language.SV2012}?;
KW_INTERFACE:
 'interface' {this.language_version >= Language.SV2005}?;
KW_INTERSECT:
 'intersect' {this.language_version >= Language.SV2005}?;
KW_JOIN: 'join';
KW_JOIN_ANY:
 'join_any' {this.language_version >= Language.SV2005}?;
KW_JOIN_NONE:
 'join_none' {this.language_version >= Language.SV2005}?;
KW_LARGE: 'large';
KW_LET:
 'let' {this.language_version >= Language.SV2009}?;
KW_LIBRARY: 'library' {this.language_version >= Language.SV2005}?; // used only in sv library file
KW_LIBLIST:
 'liblist' {this.language_version >= Language.VERILOG2001}?;
KW_LOCAL:
 'local' {this.language_version >= Language.SV2005}?;
KW_LOCALPARAM:
 'localparam' {this.language_version >= Language.VERILOG2001}?;
KW_LOGIC:
 'logic' {this.language_version >= Language.SV2005}?;
KW_LONGINT:
 'longint' {this.language_version >= Language.SV2005}?;
KW_MACROMODULE: 'macromodule';
KW_MATCHES:
 'matches' {this.language_version >= Language.SV2005}?;
KW_MEDIUM: 'medium';
KW_MODPORT:
 'modport' {this.language_version >= Language.SV2005}?;
KW_MODULE: 'module';
KW_NAND: 'nand';
KW_NEGEDGE: 'negedge';
KW_NETTYPE:
 'nettype' {this.language_version >= Language.SV2012}?;
KW_NEW:
 'new' {this.language_version >= Language.SV2005}?;
KW_NEXTTIME:
 'nexttime' {this.language_version >= Language.SV2009}?;
KW_NMOS: 'nmos';
KW_NOR: 'nor';
KW_NOSHOWCANCELLED:
 'noshowcancelled' {this.language_version >= Language.VERILOG2001}?;
KW_NOT: 'not';
KW_NOTIF0: 'notif0';
KW_NOTIF1: 'notif1';
KW_NULL:
 'null' {this.language_version >= Language.SV2005}?;
KW_OPTION: 'option';
KW_OR: 'or';
KW_OUTPUT: 'output';
KW_PACKAGE:
 'package' {this.language_version >= Language.SV2005}?;
KW_PACKED:
 'packed' {this.language_version >= Language.SV2005}?;
KW_PARAMETER: 'parameter';
KW_PMOS: 'pmos';
KW_POSEDGE: 'posedge';
KW_PRIMITIVE: 'primitive';
KW_PRIORITY:
 'priority' {this.language_version >= Language.SV2005}?;
KW_PROGRAM:
 'program' {this.language_version >= Language.SV2005}?;
KW_PROPERTY:
 'property' {this.language_version >= Language.SV2005}?;
KW_PROTECTED:
 'protected' {this.language_version >= Language.SV2005}?;
KW_PULL0: 'pull0';
KW_PULL1: 'pull1';
KW_PULLDOWN: 'pulldown';
KW_PULLUP: 'pullup';
KW_PULSESTYLE_ONDETECT:
 'pulsestyle_ondetect' {this.language_version >= Language.VERILOG2001}?;
KW_PULSESTYLE_ONEVENT:
 'pulsestyle_onevent' {this.language_version >= Language.VERILOG2001}?;
KW_PURE:
 'pure' {this.language_version >= Language.SV2005}?;
KW_RAND:
 'rand' {this.language_version >= Language.SV2005}?;
KW_RANDC:
 'randc' {this.language_version >= Language.SV2005}?;
KW_RANDCASE:
 'randcase' {this.language_version >= Language.SV2005}?;
KW_RANDOMIZE: 'randomize';
KW_RANDSEQUENCE:
 'randsequence' {this.language_version >= Language.SV2005}?;
KW_RCMOS: 'rcmos';
KW_REAL: 'real';
KW_REALTIME: 'realtime';
KW_REF:
 'ref' {this.language_version >= Language.SV2005}?;
KW_REG: 'reg';
KW_REJECT_ON:
 'reject_on' {this.language_version >= Language.SV2009}?;
KW_RELEASE: 'release';
KW_REPEAT: 'repeat';
KW_RESTRICT:
 'restrict' {this.language_version >= Language.SV2009}?;
KW_RETURN:
 'return' {this.language_version >= Language.SV2005}?;
KW_RNMOS: 'rnmos';
KW_RPMOS: 'rpmos';
KW_RTRAN: 'rtran';
KW_RTRANIF0: 'rtranif0';
KW_RTRANIF1: 'rtranif1';
KW_S_ALWAYS:
 's_always' {this.language_version >= Language.SV2009}?;
KW_S_EVENTUALLY:
 's_eventually' {this.language_version >= Language.SV2009}?;
KW_S_NEXTTIME:
 's_nexttime' {this.language_version >= Language.SV2009}?;
KW_S_UNTIL:
 's_until' {this.language_version >= Language.SV2009}?;
KW_S_UNTIL_WITH:
 's_until_with' {this.language_version >= Language.SV2009}?;
KW_SAMPLE: 'sample';
KW_SCALARED: 'scalared';
KW_SEQUENCE:
 'sequence' {this.language_version >= Language.SV2005}?;
KW_SHORTINT:
 'shortint' {this.language_version >= Language.SV2005}?;
KW_SHORTREAL:
 'shortreal' {this.language_version >= Language.SV2005}?;
KW_SHOWCANCELLED:
 'showcancelled' {this.language_version >= Language.VERILOG2001}?;
KW_SIGNED:
 'signed' {this.language_version >= Language.VERILOG2001}?;
KW_SMALL: 'small';
KW_SOFT:
 'soft' {this.language_version >= Language.SV2012}?;
KW_SOLVE:
 'solve' {this.language_version >= Language.SV2005}?;
KW_SPECIFY: 'specify';
KW_SPECPARAM: 'specparam';
KW_STATIC:
 'static' {this.language_version >= Language.SV2005}?;
KW_STD: 'std';
KW_STRING:
 'string' {this.language_version >= Language.SV2005}?;
KW_STRONG:
 'strong' {this.language_version >= Language.SV2009}?;
KW_STRONG0: 'strong0';
KW_STRONG1: 'strong1';
KW_STRUCT:
 'struct' {this.language_version >= Language.SV2005}?;
KW_SUPER:
 'super' {this.language_version >= Language.SV2005}?;
KW_SUPPLY0: 'supply0';
KW_SUPPLY1: 'supply1';
KW_SYNC_ACCEPT_ON:
 'sync_accept_on' {this.language_version >= Language.SV2009}?;
KW_SYNC_REJECT_ON:
 'sync_reject_on' {this.language_version >= Language.SV2009}?;
KW_TABLE: 'table' -> pushMode(TABLE_MODE);
KW_TAGGED:
 'tagged' {this.language_version >= Language.SV2005}?;
KW_TASK: 'task';
KW_THIS:
 'this' {this.language_version >= Language.SV2005}?;
KW_THROUGHOUT:
 'throughout' {this.language_version >= Language.SV2005}?;
KW_TIME: 'time';
KW_TIMEPRECISION:
 'timeprecision' {this.language_version >= Language.SV2005}?;
KW_TIMEUNIT:
 'timeunit' {this.language_version >= Language.SV2005}?;
KW_TRAN: 'tran';
KW_TRANIF0: 'tranif0';
KW_TRANIF1: 'tranif1';
KW_TRI: 'tri';
KW_TRI0: 'tri0';
KW_TRI1: 'tri1';
KW_TRIAND: 'triand';
KW_TRIOR: 'trior';
KW_TRIREG: 'trireg';
KW_TYPE:
 'type' {this.language_version >= Language.SV2005}?;
KW_TYPE_OPTION: 'type_option';
KW_TYPEDEF:
 'typedef' {this.language_version >= Language.SV2005}?;
KW_UNION:
 'union' {this.language_version >= Language.SV2005}?;
KW_UNIQUE:
 'unique' {this.language_version >= Language.SV2005}?;
KW_UNIQUE0:
 'unique0' {this.language_version >= Language.SV2009}?;
KW_UNSIGNED:
 'unsigned' {this.language_version >= Language.VERILOG2001}?;
KW_UNTIL:
 'until' {this.language_version >= Language.SV2009}?;
KW_UNTIL_WITH:
 'until_with' {this.language_version >= Language.SV2009}?;
KW_UNTYPED:
 'untyped' {this.language_version >= Language.SV2009}?;
KW_USE:
 'use' {this.language_version >= Language.VERILOG2001}?;
KW_UWIRE:
 'uwire' {this.language_version >= Language.VERILOG2005}?;
KW_VAR:
 'var' {this.language_version >= Language.SV2005}?;
KW_VECTORED: 'vectored';
KW_VIRTUAL:
 'virtual' {this.language_version >= Language.SV2005}?;
KW_VOID:
 'void' {this.language_version >= Language.SV2005}?;
KW_WAIT: 'wait';
KW_WAIT_ORDER:
 'wait_order' {this.language_version >= Language.SV2005}?;
KW_WAND: 'wand';
KW_WEAK:
 'weak' {this.language_version >= Language.SV2009}?;
KW_WEAK0: 'weak0';
KW_WEAK1: 'weak1';
KW_WHILE: 'while';
KW_WILDCARD:
 'wildcard' {this.language_version >= Language.SV2005}?;
KW_WIRE: 'wire';
KW_WITH:
 'with' {this.language_version >= Language.SV2005}?;
KW_WITHIN:
 'within' {this.language_version >= Language.SV2005}?;
KW_WOR: 'wor';
KW_XNOR: 'xnor';
KW_XOR: 'xor';
EDGE_CONTROL_SPECIFIER:
    'edge' LSQUARE_BR EDGE_DESCRIPTOR ( COMMA EDGE_DESCRIPTOR )* RSQUARE_BR;
TIME_LITERAL:
    ( UNSIGNED_NUMBER 
      | FIXED_POINT_NUMBER 
    ) TIME_UNIT;
ANY_BASED_NUMBER:
    OCTAL_NUMBER 
    | DECIMAL_NUMBER_WITH_BASE 
    | BINARY_NUMBER 
    | DECIMAL_INVALID_NUMBER_WITH_BASE 
    | DECIMAL_TRISTATE_NUMBER_WITH_BASE 
    | HEX_NUMBER 
;
BASED_NUMBER_WITH_SIZE: UNSIGNED_NUMBER ANY_BASED_NUMBER;
REAL_NUMBER_WITH_EXP:
 UNSIGNED_NUMBER ( DOT UNSIGNED_NUMBER )? EXP ( SIGN )? UNSIGNED_NUMBER;
FIXED_POINT_NUMBER:
 UNSIGNED_NUMBER DOT UNSIGNED_NUMBER;
UNSIGNED_NUMBER:
    DECIMAL_DIGIT
    ( UNDERSCORE 
      | DECIMAL_DIGIT 
    )*;
UNBASED_UNSIZED_LITERAL:
    APOSTROPHE Z_OR_X 
    | '\'0' 
    | '\'1' 
;
STRING_LITERAL: DBLQUOTE ( ANY_ASCII_CHARACTERS )* DBLQUOTE;
C_IDENTIFIER: [a-zA-Z_] ( [a-zA-Z0-9_] )*;
ESCAPED_IDENTIFIER:
    BACKSLASH ( ANY_PRINTABLE_ASCII_CHARACTER_EXCEPT_WHITE_SPACE )* WHITE_SPACE;
SIMPLE_IDENTIFIER: [a-zA-Z_] ( [a-zA-Z0-9_$] )*;
SYSTEM_TF_IDENTIFIER: DOLAR ( [a-zA-Z0-9_$] )+;
SEMI: ';';
LPAREN: '(';
RPAREN: ')';
LSQUARE_BR: '[';
RSQUARE_BR: ']';
LBRACE: '{';
RBRACE: '}';
APOSTROPHE: '\'';
APOSTROPHE_LBRACE: '\'{';
SHIFT_LEFT: '<<';
SHIFT_RIGHT: '>>';
ARITH_SHIFT_LEFT: '<<<';
ARITH_SHIFT_RIGHT: '>>>';
DOLAR: '$';
MOD: '%';
NOT: '!';
NEG: '~';
NAND: '~&';
NOR: '~|';
XOR: '^';
NXOR: '~^';
XORN: '^~';
COMMA: ',';
DOT: '.';
QUESTIONMARK: '?';
COLON: ':';
DOUBLE_COLON: '::';
EQ: '==';
NE: '!=';
CASE_EQ: '===';
CASE_NE: '!==';
WILDCARD_EQ: '==?';
WILDCARD_NE: '!=?';
ASSIGN: '=';
LT: '<';
GT: '>';
GE: '>=';
LE: '<=';
PLUS_ASSIGN: '+=';
MINUS_ASSIGN: '-=';
MUL_ASSIGN: '*=';
DIV_ASSIGN: '/=';
MOD_ASSIGN: '%=';
AND_ASSIGN: '&=';
OR_ASSIGN: '|=';
XOR_ASSIGN: '^=';
SHIFT_LEFT_ASSIGN: '<<=';
SHIFT_RIGHT_ASSIGN: '>>=';
ARITH_SHIFT_LEFT_ASSIGN: '<<<=';
ARITH_SHIFT_RIGHT_ASSIGN: '>>>=';
PLUS: '+';
MINUS: '-';
AMPERSAND: '&';
AND_LOG: '&&';
BAR: '|';
OR_LOG: '||';
BACKSLASH: '\\';
MUL: '*';
DIV: '/';
DOUBLESTAR: '**';
BI_DIR_ARROW: '<->';
ARROW: '->';
DOUBLE_RIGHT_ARROW: '->>';
INCR: '++';
DECR: '--';
DIST_WEIGHT_ASSIGN: ':=';
OVERLAPPING_IMPL: '|->';
NONOVERLAPPING_IMPL: '|=>';
IMPLIES: '=>';
IMPLIES_P: '-=>';
IMPLIES_N: '+=>';
PATH_FULL: '*>';
HASH_MINUS_HASH: '#-#';
HASH_EQ_HASH: '#=#';
AT: '@';
DOUBLE_AT: '@@';
HASH: '#';
DOUBLE_HASH: '##';
TRIPLE_AND: '&&&';
ONE_LINE_COMMENT:
    '//' .*? ( '\r' )? ( EOF 
                         | '\n' 
                       ) -> channel(HIDDEN);
BLOCK_COMMENT: '/*' .*? '*/' -> channel(HIDDEN);
WHITE_SPACE: [ \t\n\r\f] + -> channel(HIDDEN);
fragment EDGE_DESCRIPTOR:
    Z_OR_X ZERO_OR_ONE 
    | ZERO_OR_ONE Z_OR_X 
    | '01' 
    | '10' 
;
fragment ZERO_OR_ONE: [01];
fragment Z_OR_X: [xXzZ];
fragment TIME_UNIT:
    's' 
    | 'ms' 
    | 'us' 
    | 'ns' 
    | 'ps' 
    | 'fs' 
;
fragment DECIMAL_NUMBER_WITH_BASE:
    DECIMAL_BASE UNSIGNED_NUMBER;
fragment DECIMAL_INVALID_NUMBER_WITH_BASE:
    DECIMAL_BASE X_DIGIT ( UNDERSCORE )*;
fragment DECIMAL_TRISTATE_NUMBER_WITH_BASE:
    DECIMAL_BASE Z_DIGIT ( UNDERSCORE )*;
fragment BINARY_NUMBER: BINARY_BASE BINARY_VALUE;
fragment OCTAL_NUMBER: OCTAL_BASE OCTAL_VALUE;
fragment HEX_NUMBER: HEX_BASE HEX_VALUE;
fragment SIGN:
   PLUS 
   | MINUS 
;
fragment SIZE: NON_ZERO_UNSIGNED_NUMBER;
fragment NON_ZERO_UNSIGNED_NUMBER:
 NON_ZERO_DECIMAL_DIGIT ( UNDERSCORE 
                          | DECIMAL_DIGIT 
                          )*;
fragment EXP: [eE];
fragment BINARY_VALUE:
 BINARY_DIGIT ( UNDERSCORE 
                  | BINARY_DIGIT 
                  )*;
fragment OCTAL_VALUE:
 OCTAL_DIGIT ( UNDERSCORE 
              | OCTAL_DIGIT 
              )*;
fragment HEX_VALUE:
 HEX_DIGIT ( UNDERSCORE 
              | HEX_DIGIT 
              )*;
fragment DECIMAL_BASE:
 APOSTROPHE ( WHITE_SPACE )? ( [sS] )? ( WHITE_SPACE )? [dD] ( WHITE_SPACE )?;
fragment BINARY_BASE:
 APOSTROPHE ( WHITE_SPACE )? ( [sS] )? ( WHITE_SPACE )? [bB] ( WHITE_SPACE )?;
fragment OCTAL_BASE:
 APOSTROPHE ( WHITE_SPACE )? ( [sS] )? ( WHITE_SPACE )? [oO] ( WHITE_SPACE )?;
fragment HEX_BASE:
 APOSTROPHE ( WHITE_SPACE )? ( [sS] )? ( WHITE_SPACE )? [hH] ( WHITE_SPACE )?;
fragment NON_ZERO_DECIMAL_DIGIT: [1-9];
fragment DECIMAL_DIGIT: [0-9];
fragment BINARY_DIGIT:
 X_DIGIT 
  | Z_DIGIT 
  | [01] 
 ;
fragment OCTAL_DIGIT:
 X_DIGIT 
  | Z_DIGIT 
  | [0-7] 
 ;
fragment HEX_DIGIT:
 X_DIGIT 
  | Z_DIGIT 
  | [0-9a-fA-F] 
 ;
fragment X_DIGIT: [xX];
fragment Z_DIGIT:
 QUESTIONMARK 
  | [zZ] 
 ;
fragment DBLQUOTE: '"';
fragment UNDERSCORE: '_';
fragment ANY_ASCII_CHARACTERS:
 ~['\\\r\n] 
  | '\\\n' 
  | '\\\r\n'
  | '\\' [abefnrtv$@luLEQU\\'%] 
  | '\\' [0-9] [0-9]? [0-9]? 
  | '\\' 'x' [0-9A-Fa-f] [0-9A-Fa-f]? 
 ;
fragment ANY_PRINTABLE_ASCII_CHARACTER_EXCEPT_WHITE_SPACE: '\u0021'..'\u007E';

mode TABLE_MODE;
    TABLE_MODE_KW_ENDTABLE: KW_ENDTABLE -> popMode,type(KW_ENDTABLE);
    LEVEL_SYMBOL:
        QUESTIONMARK 
        | [01xXbB] 
    ;
    EDGE_SYMBOL:
        MUL 
        | [rRfFpPnN] 
    ;
    TABLE_MODE_BLOCK_COMMENT: BLOCK_COMMENT -> channel(HIDDEN),type(BLOCK_COMMENT);
    TABLE_MODE_COLON: ':' -> type(COLON);
    TABLE_MODE_LPAREN: '(' -> type(LPAREN);
    TABLE_MODE_MINUS: '-' -> type(MINUS);
    TABLE_MODE_ONE_LINE_COMMENT: ONE_LINE_COMMENT -> channel(HIDDEN),type(ONE_LINE_COMMENT);
    TABLE_MODE_RPAREN: ')' -> type(RPAREN);
    TABLE_MODE_SEMI: ';' -> type(SEMI);
    TABLE_MODE_WHITE_SPACE: [ \t\n\r] + -> channel(HIDDEN),type(WHITE_SPACE);