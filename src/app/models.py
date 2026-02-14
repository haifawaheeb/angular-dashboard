

from . import db

# نموذج المستخدم (User Model)
class User(db.Model):
    __tablename__ = 'users'  # اسم الجدول في قاعدة البيانات

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False) # يجب تخزين كلمة المرور مشفرة دائماً

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

# نموذج الدورة (Course Model)
class Course(db.Model):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description
        }

# نموذج التسجيل (Enrollment Model)
class Enrollment(db.Model):
    __tablename__ = 'enrollments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)

    # تعريف العلاقات (Relationships)
    user = db.relationship('User', backref=db.backref('enrollments', lazy=True))
    course = db.relationship('Course', backref=db.backref('enrollments', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'course_id': self.course_id
        }
