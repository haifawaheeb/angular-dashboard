import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  forwardRef,
  OnInit,
  Inject
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgForm,
  NgModel,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auto-textarea.component.html',
  styleUrls: ['./auto-textarea.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccAutoTextareaComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AccAutoTextareaComponent),
      multi: true
    }
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class AccAutoTextareaComponent
  implements ControlValueAccessor, Validators, OnInit
{
  // أحداث
  @Output() public focused: EventEmitter<Event> = new EventEmitter<Event>();

  // الخصائص الأساسية
 @Input() public name!: string;
@Input() public id!: string;
@Input() public required: boolean = false;
@Input() public disabled: boolean = false;
@Input() public pattern: string = '';
@Input() public label!: string;
@Input() public Stylepravte: { [key: string]: any } | null = null;
@Input() public classstyle!: string;
@Input() public hint!: string;
@Input() public placeholder: string = '';
@Input() public sizelabel: number = 20;
@Input() public backColor: string = '#ffffff';
@Input() public FontColor: string = '#000000';
@Input() public LabelColor: string = '#000000';
@Input() public rows: number = 3;
@Input() public sizeinput: number = 80;

@Input() FontSize: string = '12px';
@Input() FontFamily: string = 'El Messiri, sans-serif';

@Input() minlength?: number;
@Input() maxlength?: number;
@Input() autoResize: boolean = true;
@Input() showCounter: boolean = true;
@Input() showErrors: boolean = true;

public value: string | number = '';

  // dir الحالي
  public dir: 'rtl' | 'ltr' = 'rtl';

  // دوال Angular Forms
// Angular Forms
private propagateChange!: (value: any) => void;
private propagateTouched!: () => void;

@ViewChild(NgModel, { static: false })
inputModel!: NgModel;

@ViewChild('textareaRef', { static: false })
textareaRef!: ElementRef<HTMLTextAreaElement>;


  constructor(@Inject(DOCUMENT) private document: Document) {}

  // قراءة الاتجاه من الـ <body> أو <html>
  ngOnInit(): void {
    const bodyDir = this.document?.body?.dir;
    const htmlDir = this.document?.documentElement?.dir;
    const dir = bodyDir || htmlDir;
    this.dir = dir === 'ltr' || dir === 'rtl' ? (dir as any) : 'rtl';
  }

  // ControlValueAccessor
  public writeValue(value: string | number): void {
    this.value = value ?? '';
    // بعد ما تتغير القيمة من الخارج نضبط ارتفاع التيكست إيريا
    setTimeout(() => this.resizeTextarea(), 0);
  }

  public registerOnChange(fn: (value: any) => void): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.propagateTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Validator
  public validate(control: AbstractControl): ValidationErrors | null {
    if (!this.inputModel) {
      return null;
    }
    if (!this.inputModel.touched && !this.inputModel.dirty) {
      return null;
    }
    return this.inputModel.errors;
  }

  // هل هناك خطأ ظاهر الآن؟
  get hasError(): boolean {
    return !!(
      this.inputModel &&
      this.inputModel.invalid &&
      (this.inputModel.touched || this.inputModel.dirty)
    );
  }

  // عند تغيير القيمة من المستخدم
  public onInternalChange(): void {
    if (this.propagateChange) {
      this.propagateChange(this.value);
    }
  }

  // عند فقدان التركيز
  public handleBlur(): void {
    if (this.propagateTouched) {
      this.propagateTouched();
    }
  }


  public focus(): void {
    if (this.textareaRef?.nativeElement) {
      this.textareaRef.nativeElement.focus();
      this.textareaRef.nativeElement.select();
    }
  }


  public onFocus(e: Event): void {
    this.focused.emit(e);
  }

  public resizeTextarea(): void {
    if (!this.autoResize || !this.textareaRef?.nativeElement) {
      return;
    }
    const el = this.textareaRef.nativeElement;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }
}
