import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
  forwardRef,
  Inject,

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
  Validator,

} from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule ,CommonModule,
  FormsModule],
  templateUrl: './auto-input.component.html',
  styleUrls: ['./auto-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccAutoInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AccAutoInputComponent),
      multi: true
    }
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class AccAutoInputComponent implements ControlValueAccessor, Validator {

  // 🔹 Events
  @Output() public focused = new EventEmitter<Event>();
  @Output() public focusoutw = new EventEmitter<number | string>();
  @Output() public keypress = new EventEmitter<number | string>();
  @Output() public ChangeValue = new EventEmitter<number | string>();
  @Output() public Change = new EventEmitter<number | string>();
  @Output() public OnKeyUp = new EventEmitter<any>();
  @Output() public OnKeyDown = new EventEmitter<any>();
  @Output() public OpenDialog = new EventEmitter<any>();

  // 🔹 Inputs
  @Input() public name!: string;
  @Input() public id!: string;
  @Input() public type: string = 'text';
  @Input() public required: boolean = false;
  @Input() public UsingIcon: boolean = false;
  @Input() public Icon: string | null = null;
  @Input() public disabled: boolean = false;
  @Input() public hidden: boolean = false;
  @Input() public showSearch: boolean = false;
  @Input() public pattern: string = '';
  @Input() public label: string | undefined;
  @Input() public Stylepravte: { [key: string]: any } | null = null;
  @Input() public classstyle: string = '';
  @Input() public hint: string | undefined;
  @Input() public placeholder: string = '';
  @Input() public backColor: string = '#ffffff';
  @Input() public disableColor: string = '#eeeeee';

  @Input() public FontColor: string = '#000000';
  @Input() public FontSize: string = '12px';
  @Input() public FontFamily: string = 'El Messiri, sans-serif';
  @Input() public LabelColor: string = '#000000';
  @Input() public sizelabel: number = 20;
  @Input() public sizeinput: number = 80;

  public value: string | number = '';

  private propagateChange!: (value: any) => void;
  private propagateTouched!: () => void;

  @ViewChild(NgModel, { static: false }) inputModel!: NgModel;
  @ViewChild('input', { static: false }) inputElement!: ElementRef<HTMLInputElement>;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  // dir ديناميكي (بدل jQuery)
  get root(): 'rtl' | 'ltr' {
    const dir = this.document?.body?.dir || this.document?.documentElement?.dir || 'rtl';
    return dir === 'ltr' ? 'ltr' : 'rtl';
  }

  // ControlValueAccessor
  writeValue(value: string | number): void {
    this.value = value ?? '';
    this.Change.emit(this.value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Validator
  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.inputModel) return null;
    if (!this.inputModel.touched && !this.inputModel.dirty) return null;
    return this.inputModel.errors;
  }

  // 🔹 Events logic
  public onChange(): void {
    if (this.propagateChange) {
      const val = this.type === 'number' ? Number(this.value) : this.value;
      this.propagateChange(val);
      this.Change.emit(val);
    }
  }

  public onBlur(): void {
    if (this.propagateTouched) {
      this.propagateTouched();
    }
  }

  public OpenDlg(event: Event): void {
    this.OpenDialog.emit(this.value);
  }

  public Onkeydown(event: KeyboardEvent): void {
    this.OnKeyDown.emit(event);
  }

  public onkeyup(event: KeyboardEvent): void {
    this.OnKeyUp.emit(event);
  }

  public focus(): void {
    if (this.inputElement?.nativeElement) {
      this.inputElement.nativeElement.focus();
      this.inputElement.nativeElement.select();
    }
  }

  public onFocus(e: Event): void {
    this.focused.emit(e);
  }

  public focusoutMothed(event: FocusEvent): void {
    if (this.propagateChange) {
      const val = this.type === 'number' ? Number(this.value) : this.value;
      this.propagateChange(val);
      this.focusoutw.emit(val);
    }
  }

  public keypressMothed(event: KeyboardEvent): boolean | void {
    if ((event.key === '+' || event.key === '-') && this.type === 'number') {
      event.preventDefault();
      return false;
    } else if (this.propagateChange) {
      const val = this.type === 'number' ? Number(this.value) : this.value;
      this.propagateChange(val);
      this.keypress.emit(val);
    }
  }

  public ChangeValueMothed(): void {
    if (this.propagateChange) {
      const val = this.type === 'number' ? Number(this.value) : this.value;
      this.propagateChange(val);
      this.ChangeValue.emit(val);
    }
  }
}
